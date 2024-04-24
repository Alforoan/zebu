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

async function editFlashcard(req,res){
  try {
    const {cardId, deckId, lastAnswered, nextScheduled, status} = req.body;
    const flashcardQuery = 'SELECT * FROM flashcards WHERE deck_id = $1 AND id = $2';
    const flashcardResult = await pool.query(flashcardQuery, [deckId, cardId]);
    const flashcard = flashcardResult.rows[0];
    if(flashcard){
      const updateQuery = `
        UPDATE flashcards
        SET times = times + 1,
            last_answered = $1,
            next_scheduled = $2,
            status = $3
        WHERE id = $4 AND deck_id = $5
      `;
      await pool.query(updateQuery, [lastAnswered, nextScheduled, status, cardId, deckId])
      res.json({message: ' Flashcard updated successfully'});
    }else{
      res.status(404).json({error: 'Flashcard not found'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'});
  } 
  
}

async function getFlashcardInfo (req,res){
  try {
    const {id} = req.query;
    const flashcardQuery = 'SELECT * FROM flashcards WHERE id = $1'
    const flashcardQueryResult = await pool.query(flashcardQuery, [id]);
    const flashcard = flashcardQueryResult.rows[0];
    res.status(201).json({flashcard, message: 'success'});
  } catch (error) {
    console.log(error);
  }
}

async function editFlashcardText(req,res) { 
  try {
    const {front, back, id} = req.body;
    const flashcardQuery = `
      UPDATE flashcards 
      SET front = $1, 
          back = $2 
      WHERE id = $3
    `;
    await pool.query(flashcardQuery, [front, back, id]);
    
    const getFlashcardQuery = 'SELECT * FROM flashcards WHERE id = $1';
    const flashcardResult = await pool.query(getFlashcardQuery, [id]);
    const flashcard = flashcardResult.rows[0];
    console.log({flashcard});
    res.status(200).json({flashcard, message: 'hi there'})
  } catch (error) {
    console.log(error);
    res.status(500).json('server error');
  }
}

async function getAllFlashcards(req, res) {
  try {
    const { id } = req.query;
    const flashcardsQuery = 'SELECT * FROM flashcards WHERE user_id = $1';
    const flashcardsResult = await pool.query(flashcardsQuery, [id]);

    if (flashcardsResult.rows.length === 0) {
      return res.status(404).json({ message: 'No flashcards exist' });
    }
    res.status(200).json({ flashcards: flashcardsResult.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



export { createFlashcard, getFlashcards, editFlashcard, getFlashcardInfo, editFlashcardText, getAllFlashcards };
