import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { createServer } from 'http';
import connectDB from './db.js';
import userRouter from './routes/user.Routes.js';
import './config/passport.js'; // Import passport config

const app = express();

// database connect
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('backend is running');
});

// Mount routes
app.use('/api/users', userRouter);
app.use('/auth', userRouter); // Support /auth/google routes

const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
