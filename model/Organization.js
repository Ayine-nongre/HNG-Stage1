import { DataTypes } from "sequelize";
import { db } from "../config/database.js";
import { User } from "./User.js";


export const Organization = db.define(
    'organizations',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    { timestamps: false }
)

await Organization.sync().catch(err => console.log(err))