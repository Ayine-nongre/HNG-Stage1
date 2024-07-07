import { DataTypes } from "sequelize";
import { db } from "../config/database.js";
import { Organization } from "./Organization.js";
import { User } from "./User.js";

export const User_Organization = db.define(
    'users_organizations',
    { },
    { timestamps: false }
)

User.belongsToMany(Organization, { through: "users_organizations" }) //, as: 'organizations', foreignKey: 'org_id' })
Organization.belongsToMany(User, { through: "users_organizations"}) //, as: 'users', foreignKey: 'user_id' })

await User_Organization.sync().catch(err => console.log(err))