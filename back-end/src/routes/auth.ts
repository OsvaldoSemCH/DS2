import express, {Router} from 'express';
import AuthController from '../controllers/auth.ts';

const AuthRoutes : Router = express.Router();

AuthRoutes.post('/register', AuthController.Register);
AuthRoutes.post('/login', AuthController.Login);

export default AuthRoutes