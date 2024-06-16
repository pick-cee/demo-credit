import { NextFunction, Request, Response } from "express";
import { createTransaction, getUserById, updateUserBalance, updateWalletBalance } from "../models";
import { CustomResponse } from "../utils";
import knex from '../database/knexfile';
import { Knex } from 'knex'

const db: Knex = require('knex')(knex);

const fundAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, amount } = req.body
    try {
        await db.transaction(async trx => {
            // add funds to user's account
            await updateUserBalance(userId, amount, trx)

            // record the transacation
            await updateWalletBalance(userId, amount, trx)
            await createTransaction({ user_id: userId, type: 'credit', amount, status: 'completed' }, trx)
            return next(new CustomResponse(res).success(
                'Account funded successfully',
                {},
                200,
                {
                    type: 'success',
                    action: 'account-funding'
                }
            ))
        })
    }
    catch (error: any) {
        return next(new CustomResponse(res).error(
            'Failed to fund account',
            500,
            error.message
        ));
    }
}

const transferFunds = async (req: Request, res: Response, next: NextFunction) => {
    const { senderId, recipientId, amount } = req.body;
    try {
        await db.transaction(async trx => {
            const sender = await getUserById(senderId, trx);
            const recipient = await getUserById(recipientId, trx);

            if (!sender || !recipient) {
                return next(new CustomResponse(res).error(
                    'Sender or recipient not found',
                    404
                ))
            }

            if (sender.balance! < amount) {
                return next(new CustomResponse(res).error(
                    'Insufficient funds',
                    400
                ))
            }

            await updateUserBalance(senderId, -amount, trx);
            await updateUserBalance(recipientId, amount, trx);
            await updateWalletBalance(recipientId, amount, trx);
            await updateWalletBalance(senderId, -amount, trx);

            await createTransaction({ user_id: senderId, type: 'debit', amount, status: 'completed' }, trx);
            await createTransaction({ user_id: recipientId, type: 'credit', amount, status: 'completed' }, trx);

            return next(new CustomResponse(res).success(
                'Funds Transferred successfully',
                {},
                200,
                {
                    type: 'success',
                    action: 'account-transfer'
                }
            ))
        })
    }
    catch (error: any) {
        return next(new CustomResponse(res).error(
            'Failed to fund account',
            500,
            error.message
        ));
    }
};

const withdrawFunds = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, amount } = req.body;
    try {
        await db.transaction(async trx => {
            const user = await getUserById(userId);

            if (!user) {
                return next(new CustomResponse(res).error(
                    'User not found',
                    404
                ))
            }

            if (user.balance! < amount) {
                return next(new CustomResponse(res).error(
                    'Insufficient funds',
                    400
                ))
            }

            await updateUserBalance(userId, -amount, trx);
            await updateWalletBalance(userId, -amount, trx)

            await createTransaction({ user_id: userId, type: 'debit', amount, status: 'completed' }, trx);

            return next(new CustomResponse(res).success(
                'Funds withdrawn successfully',
                {},
                200,
                {
                    type: 'success',
                    action: 'withdraw-funds'
                }
            ))
        })
    }
    catch (error: any) {
        return next(new CustomResponse(res).error(
            'Failed to fund account',
            500,
            error.message
        ));
    }
};

export { fundAccount, transferFunds, withdrawFunds }