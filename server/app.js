import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import { login } from './controllers/authController.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import jwt from 'jsonwebtoken';

config();
const app = express();

const pool = new pg.Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use(cookieParser());
app.use('/api/user/', userRoutes);
app.get('/api/user/login', verifyJWT, (req,res) => {
  res.json({message: 'success'})
});
app.get('/api/user/decks', verifyJWT, (req,res) => {
  res.json({message:'success'})
})
//app.get('/decks', verifyJWT);
// app.use(verifyJWT);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default pool;