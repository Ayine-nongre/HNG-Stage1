import { body, validationResult } from "express-validator";
import { validatorResult } from "../middleware/validator.js";

export const createOrgValidator = [
    body('name')
    .notEmpty()
    .withMessage(`Name cannot be empty`),
    validatorResult
]