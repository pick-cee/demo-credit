import dotenv from 'dotenv'
import app from './app'
import { checkBlacklist } from './utils'

dotenv.config()
const port = process.env.PORT

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`)
})