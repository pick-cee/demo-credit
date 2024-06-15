import request from 'supertest';
import app from '../src/app'

describe('User Controller', () => {
    describe('signup', () => {
        it('should return 403 if user is blacklisted', async () => {
            jest.spyOn(require('../src/utils/blacklistCheck'), 'checkBlacklist').mockResolvedValue({ status: 200 })

            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({ fullName: 'John Doe', email: 'john@example.com', password: 'password' })

            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('You cannot sign up, you are in the blacklist');
        });

        it('should return 400 if user already exists', async () => {
            jest.spyOn(require('../src/utils/blacklistCheck'), 'checkBlacklist').mockResolvedValue({ status: 404 })
            jest.spyOn(require('../src/models/userModel'), 'getUserByEmail')
                .mockResolvedValue({ id: 1, email: 'john@example.com' })

            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({ fullName: 'John Doe', email: 'john@example.com', password: 'password' })

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('User already exists, sign in');
        });

        it('should create a new user and wallet', async () => {
            jest.spyOn(require('../src/utils/blacklistCheck'), 'checkBlacklist').mockResolvedValue({ status: 404 })
            jest.spyOn(require('../src/models/userModel'), 'getUserByEmail')
                .mockResolvedValue(undefined)
            jest.spyOn(require('../src/models/userModel'), 'createUser').mockResolvedValue(1)
            jest.spyOn(require('../src/models/walletModel'), 'createWallet').mockResolvedValue(1)

            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({ fullName: 'John Doe', email: 'john@example.com', password: 'password' });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Welcome onboard!');
            expect(res.body.data.fullName).toBe('John Doe');
            expect(res.body.data.wallet).toBe(1)
            expect(res.body.data.email).toBe('john@example.com');
            expect(res.body.meta.type).toBe('success');
            expect(res.body.meta.action).toBe('sign-up');
        });
    });

    describe('signin', () => {
        it('should return 404 if user not found', async () => {
            jest.spyOn(require('../src/models/userModel'), 'getUserByEmail')
                .mockResolvedValue(undefined)

            const res = await request(app)
                .post('/api/v1/users/login')
                .send({ email: 'john@example.com', password: 'password' });

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('User not found');
        });

        it('should return 401 if password is invalid', async () => {
            jest.spyOn(require('../src/models/userModel'), 'getUserByEmail')
                .mockResolvedValue({ id: 1, email: 'john@example.com', password: 'hashedPassword' })
            jest.spyOn(require('argon2'), 'verify').mockResolvedValue(false)

            const res = await request(app)
                .post('/api/v1/users/login')
                .send({ email: 'john@example.com', password: 'wrongPassword' });

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid credentials');
        });

        it('should sign in user and return token', async () => {
            jest.spyOn(require('../src/models/userModel'), 'getUserByEmail')
                .mockResolvedValue({ id: 1, email: 'john@example.com', password: 'hashedPassword' })
            jest.spyOn(require('argon2'), 'verify').mockResolvedValue(true)
            jest.spyOn(require('jsonwebtoken'), 'sign').mockResolvedValue('jsonwebtoken')

            const res = await request(app)
                .post('/api/v1/users/login')
                .send({ email: 'john@example.com', password: 'password' });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Welcome back!');
            expect(res.body.data.user).toEqual({ id: 1, email: 'john@example.com', password: 'hashedPassword' });
            expect(res.body.data.token).toBe('jsonwebtoken');
            expect(res.body.meta.type).toBe('success');
            expect(res.body.meta.action).toBe('login');
        });
    });
});