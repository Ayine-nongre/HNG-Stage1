import { createToken } from "../middleware/createToken.js"
import { User } from "../model/User.js"
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ where: { email }}).catch(err => {
        console.log(err)
        return res.status(401).json({
            "status": "Bad Request",
            "message": "Authentication failed",
            "statusCode": 401
        })
    })

    if (!user) return res.status(401).json({
        "status": "Bad Request",
        "message": "Authentication failed",
        "statusCode": 401
    })

    const isAuthorised = await bcrypt.compare(password, user.password).catch(err => {
        console.log(err)
        return res.status(401).json({
            "status": "Bad Request",
            "message": "Authentication failed",
            "statusCode": 401
        })
    })

    if (!isAuthorised) return res.status(401).json({
        "status": "Bad Request",
        "message": "Authentication failed",
        "statusCode": 401
    })

    createToken(user, res, 200)
}