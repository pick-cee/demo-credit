import knex from '../database/knexfile'
import { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const db: Knex = require('knex')(knex);

interface Wallet {
    id?: number;
    user_id: number;
    balance?: number;
}

const createWallet = async (userId: number, trx?: Knex.Transaction): Promise<number> => {
    const [wallet] = await db('wallets').transacting(trx!).insert({ user_id: userId })
    return wallet;
};

const getWalletByUserId = async (user_id: number): Promise<Wallet> => {
    return await db('wallets').where({ user_id: user_id }).first();
};

const updateWalletBalance = async (user_id: number, amount: number, trx?: Knex.Transaction): Promise<any> => {
    const query = await db('wallets').transacting(trx!).where({ user_id: user_id }).increment('balance', amount) as any
    return query
};

export { createWallet, getWalletByUserId, updateWalletBalance };
