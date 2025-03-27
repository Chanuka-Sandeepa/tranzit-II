import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import DbCon from './config/DB.js';
import AuthRoutes from './route/Auth.js';
import AdminRoutes from './route/Admin.js';
import UserRoutes from './route/user.js';
import VehicleRoutes from './route/VehicleRoute.js';
import RouteRoutes from './route/routeRoutes.js';
dotenv.config();
const app = express();
const PORT = 9001;

DbCon();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Routes
app.use('/auth/api', AuthRoutes);
app.use('/admin/api', AdminRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/vehicle', VehicleRoutes);
app.use('/api/route', RouteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


