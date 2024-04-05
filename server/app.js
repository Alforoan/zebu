import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
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

app.post('/api/user/signup', async (req,res) => {
  try {
     const { email, password } = req.body; 
     const client = await pool.connect();
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
