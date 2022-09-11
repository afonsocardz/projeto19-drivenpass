import { Router } from 'express';
import { createNote, deleteNote, getNoteById, getNotesByUserId } from '../controllers/noteControllers';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { NoteSchema } from '../schemas/Note';

const router = Router();

router.post('/', validateToken, validateSchema(NoteSchema), createNote);
router.get('/:id', validateToken, getNoteById);
router.get('/', validateToken, getNotesByUserId);
router.delete('/:id', validateToken, deleteNote);

export default router;