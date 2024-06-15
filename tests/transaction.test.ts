import request from 'supertest';
import app from '../src/app';
import { createTransaction, getUserById, updateUserBalance, updateWalletBalance } from '../src/models';
import { verifyToken } from '../src/middlewares';

jest.mock('../src/models/transactionModel', () => ({
    createTransaction: jest.fn(),
}));

jest.mock('../src/models/userModel', () => ({
    getUserById: jest.fn(),
    updateUserBalance: jest.fn(),
}));

jest.mock('../src/models/walletModel', () => ({
    updateWalletBalance: jest.fn(),
}));

jest.mock('../src/middlewares/verifyToken', () => ({
    verifyToken: jest.fn((req, res, next) => {
        req.user = { id: 1 }; // Set a mock user object
        next();
    }),
}));

describe('Transaction Controller', () => {
    describe('fund account', () => {
        it('should fund the account and create a transaction', async () => {
            (updateUserBalance as jest.Mock).mockResolvedValue({ id: 1, amount: 2000 });
            (updateWalletBalance as jest.Mock).mockResolvedValue({ id: 1, amount: 2000 });
            (createTransaction as jest.Mock).mockResolvedValue(1);

            const res = await request(app)
                .post('/api/v1/transactions/fund')
                .set('Authorization', 'Bearer mockToken')
                .send({ userId: 1, amount: 1000 });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Account funded successfully');
        });
    });

    describe('transferFunds', () => {
        it('should transfer funds between accounts and create transactions', async () => {
            (getUserById as jest.Mock)
                .mockResolvedValueOnce({ id: 1, balance: 2000 })
                .mockResolvedValueOnce({ id: 2, balance: 1000 });
            (updateUserBalance as jest.Mock).mockResolvedValue(true);
            (updateWalletBalance as jest.Mock).mockResolvedValue(true);
            (createTransaction as jest.Mock).mockResolvedValue(1);

            const res = await request(app)
                .post('/api/v1/transactions/transfer')
                .set('Authorization', 'Bearer mockToken')
                .send({ senderId: 1, recipientId: 2, amount: 500 });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Funds Transferred successfully');
        });

        it('should return 404 if sender or recipient not found', async () => {
            (getUserById as jest.Mock)
                .mockResolvedValueOnce(undefined)
                .mockResolvedValueOnce({ id: 2, balance: 1000 });

            const res = await request(app)
                .post('/api/v1/transactions/transfer')
                .set('Authorization', 'Bearer mockToken')
                .send({ senderId: 1, recipientId: 2, amount: 500 });

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Sender or recipient not found');
        });

        it('should return 400 if sender has insufficient funds', async () => {
            (getUserById as jest.Mock)
                .mockResolvedValueOnce({ id: 1, balance: 200 })
                .mockResolvedValueOnce({ id: 2, balance: 1000 });

            const res = await request(app)
                .post('/api/v1/transactions/transfer')
                .set('Authorization', 'Bearer mockToken')
                .send({ senderId: 1, recipientId: 2, amount: 500 });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Insufficient funds');
        });
    });

    describe('withdrawFunds', () => {
        it('should withdraw funds from the account and create a transaction', async () => {
            (getUserById as jest.Mock).mockResolvedValue({ id: 1, balance: 2000 });
            (updateUserBalance as jest.Mock).mockResolvedValue(true);
            (updateWalletBalance as jest.Mock).mockResolvedValue(true);
            (createTransaction as jest.Mock).mockResolvedValue(1);

            const res = await request(app)
                .post('/api/v1/transactions/withdraw')
                .set('Authorization', 'Bearer mockToken')
                .send({ userId: 1, amount: 500 });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Funds withdrawn successfully');
        });

        it('should return 404 if user not found', async () => {
            (getUserById as jest.Mock).mockResolvedValue(undefined);

            const res = await request(app)
                .post('/api/v1/transactions/withdraw')
                .set('Authorization', 'Bearer mockToken')
                .send({ userId: 1, amount: 500 });

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('User not found');
        });

        it('should return 400 if user has insufficient funds', async () => {
            (getUserById as jest.Mock).mockResolvedValue({ id: 1, balance: 200 });

            const res = await request(app)
                .post('/api/v1/transactions/withdraw')
                .set('Authorization', 'Bearer mockToken')
                .send({ userId: 1, amount: 500 });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Insufficient funds');
        });
    });
});
