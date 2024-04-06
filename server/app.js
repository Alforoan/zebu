import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import cors from 'cors';
import bcrypt from 'bcryptjs'
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

app.post('/api/user/signup', async (req,res) => {
  try {
     const { email, password } = req.body; 
     
     const client = await pool.connect();
     const { rowCount } = await client.query(
       'SELECT * FROM users WHERE email = $1',
       [email]
     );

     if (rowCount > 0) {
       return res.status(400).json({error: 'Email already exists'})
     }

     const result = await client.query(
       'INSERT INTO users (email, password) VALUES ($1, $2)',
       [email, password]
     );
     const users = await client.query('SELECT * FROM users');
     console.log({users});
     client.release(); 
     res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error inserting data into PostgreSQL:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/user/login', async (req,res) => {
  try {
    const { email, password } = req.body;
    const client = await pool.connect();
    const { rowCount, rows } = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if(rowCount < 1){
      return res.status(400).json({ error: 'Email does not exist, please sign up' });
    }else{
      const hashedPasswordFromDB = rows[0].password;
      console.log({hashedPasswordFromDB});
      const passwordMatches = await bcrypt.compare(
        password,
        hashedPasswordFromDB
      );
      if (!passwordMatches) {
        return res.status(400).json({ error: 'Incorrect email or password' });
      }
      res.status(200).json({ message: 'Sign-in successful' });
    }
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
