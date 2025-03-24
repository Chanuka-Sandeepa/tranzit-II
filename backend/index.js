import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import DbCon from './config/DB.js';
import AuthRoutes from './route/Auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3400;

DbCon();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Routes
app.use('/auth/api',AuthRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


