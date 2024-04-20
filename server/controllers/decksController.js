import pool from '../app.js';
import { config } from 'dotenv';

config();

async function createDeck(req, res) {
  try {
    const userId = req.userId;
    const { name } = req.body;

    const existingDeckQuery =
      'SELECT COUNT(*) FROM decks WHERE name = $1 AND user_id = $2';
    const { rows } = await pool.query(existingDeckQuery, [name, userId]);
    const existingDeckCount = parseInt(rows[0].count);

    if (existingDeckCount > 0) {
      return res.status(400).json({
        error: 'Deck with the same name already exists for this user',
      });
    }

    pool.query(
      'INSERT INTO decks (name, user_id) VALUES ($1, $2)',
      [name, userId]
    );

    res.status(201).json({ message: 'Deck created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  } 
}

async function showDecks(req,res) {
  console.log('showDecks has been used');
  let client;
  try {
    client = await pool.connect();
    const userId = req.userId;
    const allDecksQuery = 'SELECT * FROM decks WHERE user_id = $1';
    const { rows } = await client.query(allDecksQuery, [userId]);
    res.json({ data: rows, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }finally{
    client.release();
  }
}

async function deleteDeck(req, res) {

  try {
    const userId = req.userId;
    const { name } = req.body;
    await pool.query('DELETE FROM decks WHERE user_id = $1 AND name = $2', [
      userId,
      name,
    ]);

    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  } 
}

async function renameDeck(req,res){
  try {
    const { id, newName } = req.body;
    const updateQuery = 'UPDATE decks SET name = $1 WHERE id = $2';
    await pool.query(updateQuery, [newName, id]);
    res.json({ message: 'Deck renamed successfully' });
  } catch (error) {
    console.error('Error renaming deck:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
} 

export {createDeck, showDecks, deleteDeck, renameDeck};