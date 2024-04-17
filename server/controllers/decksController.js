import pool from '../app.js';
import { config } from 'dotenv';

config();

async function createDeck(req, res) {
  try {
    const userId = req.userId;
    console.log({userId});
    const {name} = req.body;
    const client = await pool.connect();

    const existingDeckQuery =
      'SELECT COUNT(*) FROM decks WHERE name = $1 AND user_id = $2';
    const { rows } = await client.query(existingDeckQuery, [name, userId]);
    const existingDeckCount = parseInt(rows[0].count);

    if (existingDeckCount > 0) {
      return res
        .status(400)
        .json({
          error: 'Deck with the same name already exists for this user',
        });
    }

    const result = await client.query(
      'INSERT INTO decks (name, user_id) VALUES ($1, $2)',
      [name, userId]
    );

    res.status(201).json({ message: 'Deck created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  } 
}


export {createDeck};