import { Router } from 'express';
import authRouter from './authRouters';
import cardRouter from './cardRouters';
import credentialRouter from './credentialRouters';
import noteRouter from './noteRouters';

const router = Router();

router.use(authRouter);
router.use('/credentials', credentialRouter);
router.use('/cards', cardRouter);
router.use('/notes', noteRouter)

export default router;