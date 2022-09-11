import {Router} from 'express';
import { createCredential } from '../controllers/credentialControllers';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { Credential } from '../schemas/Credential';

const router = Router();

router.post('/', validateToken, validateSchema(Credential), createCredential)

export default router;