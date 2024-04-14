import express from 'express';
import { signUp } from '../controllers/signupController.js'; 
import { login } from '../controllers/authController.js'; 
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/login', verifyJWT, (req,res) => {
  res.json({message:'success'})
});
router.get('/decks', verifyJWT,(req,res) => {
  res.json({message:'success'})
});
//router.get('/login', verifyJWT);
// router.get('/decks', verifyJWT, (req, res) => {
//   res.json({req});
// });
// router.route('/login').post(verifyJWT, login);

export default router;
