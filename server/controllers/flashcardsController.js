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

async function getFlashcards(req,res){

  console.log("SOMETHING IS HAPPENINGA");
  try {
    const {deckId} = req.params;
    const userId = req.userId;
    console.log({deckId});
    

    const flashcardQuery = 'SELECT * FROM flashcards WHERE deck_id = $1 AND user_id = $2';
    const flashcardResult = await pool.query(flashcardQuery, [deckId, userId]);
    const flashcards = flashcardResult.rows;
    if(flashcards.length > 0){
       res.status(200).json({ flashcards });
    }else{
      res.status(404).json({ message: 'No flashcards found for the given deck' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

}



export { createFlashcard, getFlashcards };
