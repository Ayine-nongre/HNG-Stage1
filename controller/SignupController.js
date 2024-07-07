import { createToken } from "../middleware/createToken.js"
import { Organization } from "../model/Organization.js"
import bcrypt from 'bcrypt'
import { User } from "../model/User.js"
import { User_Organization } from "../model/User_Organization.js"
//import { User_Organization } from "../model/User_Organization.js"

export const signup = async (req, res) => {
    const { email, firstName, lastName, password, phone } = req.body
    
    const user = await User.findOne({ where: { email }}).catch(err => {
        console.log(err)
        return res.status(400).json({
            "status": "Bad Request",
            "message": "Registration unsuccessful",
            "statusCode": 400
        })
    })

    if (user) return res.status(422).json({
        errors: [{"field": email, "message": "Email already exists"}]
    })

    const hashedPassword = await bcrypt.hash(password, 10).catch(err => {
        console.log(err)
        return res.status(400).json({
            "status": "Bad Request",
            "message": "Registration unsuccessful",
            "statusCode": 400
        })
    })

    const newUser = await User.create({
        email,
        firstname: firstName,
        lastname: lastName,
        password: hashedPassword,
        phone: phone ? phone : null 
    })
    .then(async (user) => {
        const newOrg = await Organization.create({ name: firstName + "'s Organization" })
        await User_Organization.create({ userId: user.id, organizationId: newOrg.id })
        createToken(user, res, 201) }
    )
    .catch((err) => {
        console.log(err)
        return res.status(400).json({
            "status": "Bad Request",
            "message": "Registration unsuccessful",
            "statusCode": 400
        })
    })
}