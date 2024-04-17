import express from 'express';
import { signUp } from '../controllers/signupController.js'; 
import { login, logout } from '../controllers/authController.js'; 
import { verifyJWT } from '../middleware/verifyJWT.js';
import { createDeck } from '../controllers/decksController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/login', verifyJWT, (req,res) => {
  res.json({message:'success'})
});
router.get('/logout', logout);
router.get('/decks', verifyJWT,(req,res) => {
  res.json({message:'success'})
});
router.post('/decks',verifyJWT, createDeck);
//router.get('/login', verifyJWT);
// router.get('/decks', verifyJWT, (req, res) => {
//   res.json({req});
// });
// router.route('/login').post(verifyJWT, login);

export default router;
