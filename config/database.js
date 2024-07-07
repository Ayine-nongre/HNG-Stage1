import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

export const db = new Sequelize(
    'defaultdb',
    process.env.DB_USER,
    process.env.DB_PASSWD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)