import knex from '../database/knexfile'
import { Knex } from 'knex'

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

export const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const [createdTransaction] = await db('transactions').insert(transaction).returning('*')
    return createdTransaction as Transaction
}

export const getTransactionByUserId = async (user_id: number): Promise<Transaction[]> => {
    return await db('transactions').where({ user_id }) as Transaction[]
}   