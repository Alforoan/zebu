import pool from '../app.js';
import bcrypt from 'bcrypt';

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log('EMAIL', email);
    console.log('PASSWORD', password);
    const client = await pool.connect();
    const { rowCount, rows } = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    console.log({ rows });
    console.log({ rowCount });
    if (rowCount < 1) {
      return res
        .status(400)
        .json({ error: 'Email does not exist, please sign up' });
    } else {
      const hashedPasswordFromDB = rows[0].password;
      console.log({ hashedPasswordFromDB });
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
}

export { login };
