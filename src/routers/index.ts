import { Router } from 'express';
import authRouter from './authRouters';
import cardRouter from './cardRouters';
import credentialRouter from './credentialRouters';

const router = Router();

router.use(authRouter);
router.use('/credentials', credentialRouter);
router.use('/cards', cardRouter)

export default router;