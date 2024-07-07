import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/database.js'
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { Sequelize } from 'sequelize'

export const app = express()
dotenv.config()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.authenticate()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Unable to connect to database", err))

app.use('/auth', authRouter)
app.use('/api', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
