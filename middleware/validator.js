import { body, validationResult } from "express-validator";

export const validatorResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array()
    const errData = []
    err.map(data => {
      errData.push({"field" : data.path, "message": data.msg})
    })
    return res.status(422).json({ 
        errors: errData
    });
  }

  next();
};