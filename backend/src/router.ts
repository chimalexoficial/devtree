import { Router } from 'express';
import { createAccount, login, getUser, updateProfile, uploadImage } from './handlers';
import { body } from 'express-validator';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

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
        .isLength({ min: 8 })
        .withMessage('Password is too short, min 8 characters'),
    handleInputErrors,
    createAccount);

router.post('/auth/login/',
    body('email')
        .isEmail()
        .withMessage('Email is invalid...'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleInputErrors,
    login);

router.get('/user', authenticate, getUser);
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('Handle can not be empty...'),
    body('description')
        .notEmpty()
        .withMessage('Description can not be empty...'),
    handleInputErrors,
    authenticate,
    updateProfile);

    router.post('/user/image', authenticate, uploadImage)

export default router;