import knex from '../database/knexfile'
import { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const db: Knex = require('knex')(knex);

export interface User {
    id?: number
    fullName: string
    email: string
    password: string
    balance?: number;
    created_at?: Date;
    updated_at?: Date;
}

export const getUserByEmail = async (email: string, trx?: Knex.Transaction): Promise<User | undefined> => {
    const [query] = await db('users').where({ email })
    return query as User
}

export const createUser = async (user: User, trx?: Knex.Transaction): Promise<number> => {
    const [createdUser] = await db('users').insert(user)
    return createdUser
}

export const getUserById = async (id: number, trx?: Knex.Transaction): Promise<User | undefined> => {
    const [user] = await db('users').where({ id }) as any
    return user as User
}

export const updateUserBalance = async (id: number, amount: number, trx?: Knex.Transaction): Promise<any> => {
    const query = await db('users').transacting(trx!).where({ id }).increment('balance', amount) as any
    return query
}