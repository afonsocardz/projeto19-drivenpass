import { Router } from 'express';
import authRouter from './authRouters';
import credentialRouter from './credentialRouters';

const router = Router();

router.use(authRouter);
router.use('/credentials', credentialRouter);

export default router;