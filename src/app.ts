import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './database/knexfile'


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


export default app