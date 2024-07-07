import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const createToken = async (user, res, statusCode) => {
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.PRIVATEKEY, { expiresIn: '1h' })

    if (statusCode === 200) {
        return res.status(statusCode).json({
            status: "Success",
            message: "Login successful",
            "data": {
                "accessToken": token,
                "user": {
                    "userId": user.id,
                    "firstName": user.firstname,
                    "lastName": user.lastname,
                    "email": user.email,
                    "phone": user.phone
                }
            }
        })
    } else {
        return res.status(statusCode).json({
            status: "Success",
            message: "Registration successful",
            "data": {
                "accessToken": token,
                "user": {
                    "userId": user.id,
                    "firstName": user.firstname,
                    "lastName": user.lastname,
                    "email": user.email,
                    "phone": user.phone
                }
            }
        })
    }
}

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]

        const decoded = jwt.verify(token, process.env.PRIVATEKEY, (err, acc) => {
            if (err) return res.status(401).json({
                "status": "Bad Request",
                "message": "Authentication failed",
                "statusCode": 401
            })

            req.user = acc;
            next()
        })
    } catch (err) {
        res.status(401).json({
            "status": "Bad Request",
            "message": "Authentication failed",
            "statusCode": 401
        })
    }    
}