import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import { login } from './controllers/authController.js';

config();
const app = express();

const pool = new pg.Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/api/user/', userRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default pool;