import { Router } from 'express';
import { createCard, deleteCard, getCardById, getCardsByUserId } from '../controllers/cardsControllers';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { CardSchema } from '../schemas/Card';

const router = Router();

router.post('/', validateToken, validateSchema(CardSchema), createCard);
router.get('/:id', validateToken, getCardById);
router.get('/', validateToken, getCardsByUserId);
router.delete('/:id', validateToken, deleteCard);

export default router;