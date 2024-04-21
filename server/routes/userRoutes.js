import express from 'express';
import { signUp } from '../controllers/signupController.js'; 
import { login, logout } from '../controllers/authController.js'; 
import { verifyJWT } from '../middleware/verifyJWT.js';
import { createDeck, deleteDeck, renameDeck, showDecks } from '../controllers/decksController.js';
import { createFlashcard, getFlashcards } from '../controllers/flashcardsController.js';

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
router.put('/decks/rename', renameDeck);

router.post('/add',verifyJWT, createFlashcard);
router.get('/flashcards/:deckId',verifyJWT, getFlashcards);

//router.get('/login', verifyJWT);
// router.get('/decks', verifyJWT, (req, res) => {
//   res.json({req});
// });
// router.route('/login').post(verifyJWT, login);

export default router;
