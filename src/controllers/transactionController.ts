import { NextFunction, Request, Response } from "express";
import { createTransaction, getUserById, updateUserBalance, updateWalletBalance } from "../models";
import { CustomResponse } from "../utils";


const fundAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, amount } = req.body
    // add funds to user's account
    await updateUserBalance(userId, amount)

    // record the transacation
    await updateWalletBalance(userId, amount)
    await createTransaction({ user_id: userId, type: 'credit', amount, status: 'completed' })

    return next(new CustomResponse(res).success(
        'Account funded successfully',
        {},
        200,
        {
            type: 'success',
            action: 'account-funding'
        }
    ))
}

const transferFunds = async (req: Request, res: Response, next: NextFunction) => {
    const { senderId, recipientId, amount } = req.body;

    const sender = await getUserById(senderId);
    const recipient = await getUserById(recipientId);

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

    await updateUserBalance(senderId, -amount);
    await updateUserBalance(recipientId, amount);
    await updateWalletBalance(recipientId, amount);
    await updateWalletBalance(senderId, -amount);

    await createTransaction({ user_id: senderId, type: 'debit', amount, status: 'completed' });
    await createTransaction({ user_id: recipientId, type: 'credit', amount, status: 'completed' });

    return next(new CustomResponse(res).success(
        'Funds Transferred successfully',
        {},
        200,
        {
            type: 'success',
            action: 'account-transfer'
        }
    ))

};

const withdrawFunds = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, amount } = req.body;

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

    await updateUserBalance(userId, -amount);
    await updateWalletBalance(userId, -amount)

    await createTransaction({ user_id: userId, type: 'debit', amount, status: 'completed' });

    return next(new CustomResponse(res).success(
        'Funds withdrawn successfully',
        {},
        200,
        {
            type: 'success',
            action: 'withdraw-funds'
        }
    ))
};

export { fundAccount, transferFunds, withdrawFunds }