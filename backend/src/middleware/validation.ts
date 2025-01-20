import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // handle errors
    console.log('From validation.ts');
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}