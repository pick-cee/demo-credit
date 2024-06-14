import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes'
import transactionRoutes from './routes/transactionRoutes'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((morgan('combined')))

// home route
app.get("/", (request, response) => {
    console.log(process.env.DATABASE_USER)
    response.json("Welcome to Demo credit")
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/transactions', transactionRoutes)

export default app