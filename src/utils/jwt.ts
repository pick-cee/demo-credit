import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function jwtSign(payload: any) {
    return jwt.sign(payload, `${process.env.JWT_ACCESS_KEY}`, { expiresIn: `${process.env.JWT_EXPIRES}m` })
}

export async function jwtVerify(token: any) {
    try {
        return jwt.verify(token, `${process.env.JWT_ACCESS_KEY}`)
    }
    catch (err) {
        console.log(err)
        return false
    }
}