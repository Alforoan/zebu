import pool from '../app.js';
import { config } from 'dotenv';

config();

async function createFlashcard(req, res) {
  try {
    const {deck,deckId, front, back} = req.body;
    const userId = req.userId;
    const deckQuery = 'SELECT id FROM decks WHERE id = $1 AND user_id = $2';
    const deckResult = await pool.query(deckQuery, [deckId, userId]);
    const deckExists = deckResult.rows.length > 0;

    if (!deckExists) {
      return res.status(400).json({
        error: 'Deck does not exist or does not belong to this user',
      });
    }
    await pool.query(
      'INSERT INTO flashcards (deck_id, front, back, user_id) VALUES ($1, $2, $3, $4)',
      [deckId, front, back, userId]
    );

    res.status(201).json({ message: 'Flashcard created successfully' });
  } catch (error) {
    res.status(501).json({message: 'Server Error'});
  }
}



export { createFlashcard };
