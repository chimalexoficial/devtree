import { Router } from 'express';
import { createAccount } from './handlers';
import { body } from 'express-validator';

const router = Router();

// Auth
router.post('/auth/register', 
    body('handle')
    .notEmpty()
    .withMessage('Handle can not be empty...'),

    body('name')
    .notEmpty()
    .withMessage('Name can not be empty...'),

    body('email')
    .isEmail()
    .withMessage('Email is invalid...'),

    body('password')
    .isLength({
        min: 8
    })
    .withMessage('Password is too short, min 8 characters'),

    createAccount);

export default router;