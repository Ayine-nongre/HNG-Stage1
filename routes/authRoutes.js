import express from 'express'
import { loginValidator, signupValidator } from '../utils/authValidator.js'
import { signup } from '../controller/SignupController.js'
import { login } from '../controller/LoginController.js'

export const authRouter = express.Router()

authRouter.post('/register', signupValidator, signup)
authRouter.post('/login', loginValidator, login)