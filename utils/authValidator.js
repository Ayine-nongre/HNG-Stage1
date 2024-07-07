import { body, validationResult } from "express-validator";
import { User } from "../model/User.js";
import { validatorResult } from "../middleware/validator.js";

export const signupValidator = [
    body('email')
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email, { req }) => {
        const user = await User.findOne({ where: { email : email }})
        if (user)  throw new Error("User with this email already exists")
        return email
    }),
    body('firstName')
    .notEmpty().withMessage("Please enter your firstname"),
    body('lastName')
    .notEmpty().withMessage("Please enter your lastName"),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Length of password should be 5 or more"),
    body('confirmPassword')
    .notEmpty()
    .withMessage("Password cannot be empty")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match")
        }
        return value;
    }),
    validatorResult
]

export const loginValidator = [
    body('email')
    .notEmpty()
    .withMessage(`Email cannot be empty`),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty"),
    validatorResult
]