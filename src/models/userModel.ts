import knex from '../database/knexfile'
import { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config()

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

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    const [user] = await db('users').where({ email })
    return user as User
}

export const createUser = async (user: User): Promise<number> => {
    const [createdUser] = await db('users').insert(user)
    return createdUser
}

export const getUserById = async (id: number): Promise<User | undefined> => {
    const [user] = await db('users').where({ id })
    return user as User
}

export const updateUserBalance = async (id: number, amount: number): Promise<any> => {
    return await db('users').where({ id }).increment('balance', amount)
}