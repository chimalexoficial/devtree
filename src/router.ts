import { Router } from 'express';
import { createAccount } from './handlers';

const router = Router();

// Auth
router.post('/auth/register', createAccount);

export default router;