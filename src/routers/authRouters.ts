import {Router } from 'express';
import { login, signUp } from '../controllers/authControllers';
import validateSchema from '../middlewares/validateSchemaMiddleware'
import UserSchema from '../schemas/User';


const router = Router();

router.post('/signup', validateSchema(UserSchema), signUp );
router.post('/login', login);

export default router;