import knex from '../database/knexfile'
import { Knex } from 'knex'

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

export const createUser = async (user: User): Promise<User> => {
    const [createdUser] = await db('users').insert(user).returning('*')
    return createdUser as User
}

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    const [user] = await db('users').where({ email }).first()
    return user as User
}

export const getUserById = async (id: number): Promise<User | undefined> => {
    const [user] = await db('users').where({ id }).first()
    return user as User
}

export const updateUserBalance = async (id: number, amount: number): Promise<void> => {
    await db('users').where({ id }).increment('balance', amount)
}