import express from 'express';
import { GetUser, AdminLogout } from '../Controller/Admin.js';
import { isAdmin } from '../middlewares/verifyToken.js';

const AdminRoutes = express.Router();

AdminRoutes.get('/get', isAdmin, GetUser);
AdminRoutes.get('/logout', isAdmin, AdminLogout);

export default AdminRoutes;