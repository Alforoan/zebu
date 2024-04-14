import pool from '../app.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';


config();

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const client = await pool.connect();
    const { rowCount, rows } = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (rowCount < 1) {
      return res
        .status(400)
        .json({ error: 'Email does not exist, please sign up' });
    } else {
      const hashedPasswordFromDB = rows[0].password;

      const passwordMatches = await bcrypt.compare(
        password,
        hashedPasswordFromDB
      );
      if (!passwordMatches) {
        return res.status(400).json({ error: 'Incorrect email or password' });
      }
      let foundEmail = rows[0]?.email;
      const accessToken = jwt.sign(
        { email: foundEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '20s' }
      );
      const refreshToken = jwt.sign(
        { email: foundEmail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '5m' }
      );
      const otherUsersQuery = {
        text: 'SELECT * FROM users WHERE email <> $1',
        values: [foundEmail],
      };
      const { rows: otherUsers } = await client.query(otherUsersQuery);
      const checkColumnQuery = `
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name = 'users' 
          AND column_name = 'refreshtoken'
        )`;

      const existRows = await client.query(checkColumnQuery);

      if (!existRows?.rows[0]?.exists) {
        console.log('dont exist rows right');
        const addColumnQuery = `
                ALTER TABLE users
                ADD COLUMN refreshtoken VARCHAR(255);
                `;
        await client.query(addColumnQuery);
      } else {
        console.log('column already exists');
      }
      const updateRefreshTokenQuery = `
          UPDATE users
          SET refreshToken = $1
          WHERE email = $2;
        `;

      await client.query(updateRefreshTokenQuery, [refreshToken, email]);
      res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 20 * 1000});
      res.cookie('accessToken', accessToken, {httpOnly:true, maxAge: 20 * 1000});
   
      res.json({
        accessToken,
        message: 'Sign-in successful',
      });


    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { login };
