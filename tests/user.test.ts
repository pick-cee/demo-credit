import { NextFunction, Request, Response } from 'express';
import { createUser, createWallet, getUserByEmail } from '../src/models';
import { CustomResponse, checkBlacklist, jwtSign } from '../src/utils';
import { signup, signin } from '../src/controllers/';

jest.mock('../src/models', () => ({
    createUser: jest.fn(),
    createWallet: jest.fn(),
    getUserByEmail: jest.fn(),
}));

jest.mock('../src/utils', () => ({
    checkBlacklist: jest.fn(),
    jwtSign: jest.fn(),
    CustomResponse: jest.fn().mockImplementation(() => ({
        error: jest.fn().mockReturnThis(),
        success: jest.fn().mockReturnThis(),
    }))
}));

describe('signup', () => {
    const mockRequest = {
        body: {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        },
    } as Request;

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if the user is blacklisted', async () => {
        (checkBlacklist as jest.Mock).mockResolvedValueOnce({ status: 200 });

        const mockCustomResponse = (CustomResponse as jest.Mock).mockImplementation(() => ({
            error: jest.fn().mockReturnThis(),
            success: jest.fn().mockReturnThis(),
        }));

        await signup(mockRequest, mockResponse, mockNext)

        expect(mockCustomResponse()).toHaveBeenCalledWith(
            'You cannot sign up, you are in the blacklist',
            403
        )
    });

    it('should return an error if the user already exists', async () => {
        (checkBlacklist as jest.Mock).mockResolvedValueOnce({ status: 404 });
        (getUserByEmail as jest.Mock).mockResolvedValueOnce({ email: 'john@example.com' });

        await signup(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({ status: 400, message: 'User already exists, sign up' }));
    });

    it('should create a new user and wallet', async () => {
        (checkBlacklist as jest.Mock).mockResolvedValueOnce({ status: 404 });
        (getUserByEmail as jest.Mock).mockResolvedValueOnce(undefined);
        (createUser as jest.Mock).mockResolvedValueOnce(1);
        (createWallet as jest.Mock).mockResolvedValueOnce({ id: 1, userId: 1, balance: 0 });

        await signup(mockRequest, mockResponse, mockNext);

        expect(createUser).toHaveBeenCalledWith({
            fullName: 'John Doe',
            email: 'john@example.com',
            password: expect.any(String),
        });
        expect(createWallet).toHaveBeenCalledWith({ id: 1, fullName: 'John Doe', email: 'john@example.com', password: expect.any(String) });
        expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
            status: 201,
            message: 'Welcome onboard!',
            data: {
                fullName: 'John Doe',
                email: 'john@example.com',
                wallet: { id: 1, userId: 1, balance: 0 },
            },
        }));
    });
});