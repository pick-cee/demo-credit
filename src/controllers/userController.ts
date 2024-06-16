import { NextFunction, Request, Response } from "express";
import * as argon from 'argon2'
import { createUser, createWallet, getUserByEmail } from "../models";
import { CustomResponse, checkBlacklist, jwtSign } from "../utils";
import dotenv from 'dotenv'
dotenv.config()

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body

    // check if user is blacklisted
    const isBlacklisted = await checkBlacklist(email)
    if (isBlacklisted?.status === 200) {
        return next(new CustomResponse(res).error(
            'You cannot sign up, you are in the blacklist',
            403
        ))
    }

    const userExists = await getUserByEmail(email)
    if (userExists) {
        return next(new CustomResponse(res).error(
            'User already exists, sign in',
            400
        ))
    }

    // hash the password
    const hashedPassword = await argon.hash(password)

    //create the user now
    const user = await createUser({ fullName, email, password: hashedPassword })

    //create wallet for user 
    const wallet = await createWallet(user)

    return next(new CustomResponse(res).success(
        'Welcome onboard!',
        {
            fullName,
            email,
            wallet
        },
        201,
        {
            type: 'success',
            action: 'sign-up'
        }
    ))

}

const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
        return next(new CustomResponse(res).error(
            'User not found',
            404
        ))
    }

    const isPasswordValid = await argon.verify(user.password, password)

    if (!isPasswordValid) {
        return next(new CustomResponse(res).error(
            'Invalid credentials',
            401
        ))
    }

    const token = await jwtSign({ id: user.id, email: user.email })

    return next(new CustomResponse(res).success(
        'Welcome back!',
        { user, token },
        200,
        {
            type: 'success',
            action: 'login'
        }
    ))
}

export { signup, signin }