import { Router } from 'express';
import { createCredential, getCredentialById } from '../controllers/credentialControllers';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { CredentialSchema } from '../schemas/Credential';

const router = Router();

router.post('/', validateToken, validateSchema(CredentialSchema), createCredential);
router.get('/:id', validateToken, getCredentialById);

export default router;