import express from 'express';
import { register , login, Logout} from '../Controller/Auth.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.get('/logout', Logout);

export default AuthRoutes;