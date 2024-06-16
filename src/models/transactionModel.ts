import knex from '../database/knexfile'
import { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const db: Knex = require('knex')(knex);


export interface Transaction {
    id?: number;
    user_id: number;
    type: 'credit' | 'debit';
    amount: number;
    status?: 'pending' | 'completed' | 'failed';
    created_at?: Date;
    updated_at?: Date;
}

export const createTransaction = async (transaction: Transaction, trx?: Knex.Transaction): Promise<Number> => {
    const [createdTransaction] = await db('transactions').transacting(trx!).insert(transaction) as any
    return createdTransaction
}

export const getTransactionByUserId = async (user_id: number): Promise<Transaction[]> => {
    return await db('transactions').where({ user_id }) as Transaction[]
}   