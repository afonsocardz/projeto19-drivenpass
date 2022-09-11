import { Router } from 'express';
import { createNetwork, deleteNetwork, getNetworkById, getNetworksByUserId } from '../controllers/networkControllers';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { NetworkSchema } from '../schemas/Network';

const router = Router();

router.post('/', validateToken, validateSchema(NetworkSchema), createNetwork);
router.get('/:id', validateToken, getNetworkById);
router.get('/', validateToken, getNetworksByUserId);
router.delete('/:id', validateToken, deleteNetwork);

export default router;