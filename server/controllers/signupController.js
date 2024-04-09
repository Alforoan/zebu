import pool from '../app.js';

async function signUp(req, res) {
  try {
    const { email, password } = req.body;
    console.log('EMAIL', email);
    console.log('PASSWORD', password);
    const client = await pool.connect();
    const { rowCount } = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (rowCount > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const result = await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password]
    );
    const users = await client.query('SELECT * FROM users');
    console.log({ users });
    client.release();
    res.status(201).json({ message: 'Sign-up successful' });
  } catch (error) {
    console.error('Error inserting data into PostgreSQL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { signUp };
