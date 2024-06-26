import express from 'express';
import { signUp } from '../controllers/signupController.js'; 
import { login, logout } from '../controllers/authController.js'; 
import { verifyJWT } from '../middleware/verifyJWT.js';
import { createDeck, deleteDeck, refreshDeck, renameDeck, showDecks } from '../controllers/decksController.js';
import {
  createFlashcard,
  editFlashcard,
  getFlashcardInfo,
  getFlashcards,
  editFlashcardText,
  getAllFlashcards,
} from '../controllers/flashcardsController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/login', verifyJWT, (req,res) => {
  res.json({message:'success'})
});
router.get('/logout', logout);

router.get('/decks', verifyJWT, showDecks);
router.post('/decks',verifyJWT, createDeck);
router.post('/decks/delete', verifyJWT, deleteDeck);
router.put('/decks/rename',verifyJWT, renameDeck);
router.put('/decks/:deckId',verifyJWT, refreshDeck);

router.post('/add',verifyJWT, createFlashcard);
router.get('/flashcards/:deckId',verifyJWT, getFlashcards);
router.put('/flashcards/:deckId',verifyJWT, editFlashcard);
router.get('/edit', verifyJWT, getFlashcardInfo);
router.put('/edit', verifyJWT, editFlashcardText);
router.get('/flashcards',verifyJWT, getAllFlashcards);
//router.get('/login', verifyJWT);
// router.get('/decks', verifyJWT, (req, res) => {
//   res.json({req});
// });
// router.route('/login').post(verifyJWT, login);

export default router;
