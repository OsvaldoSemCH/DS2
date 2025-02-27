import express, {Router} from 'express';
import AuthController from '../controllers/auth.ts';
import { JwtAuth, VerifyLogin, VerifyRegister } from '../filters/auth.ts';

const AuthRoutes : Router = express.Router();

AuthRoutes.post('/register', VerifyRegister, AuthController.Register);
AuthRoutes.post('/login', VerifyLogin, AuthController.Login);

export default AuthRoutes