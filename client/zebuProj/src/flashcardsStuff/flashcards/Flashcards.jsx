import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Flashcard from '../flashcard/Flashcard';
import { useParams } from 'react-router-dom';
import Navigation from '../../navigation/Navigation';

const Flashcards = () => {

  const { setDeckId } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const {deckId} = useParams();
  console.log({deckId});

   const config = {
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
   };

  useEffect(() => {
    
    const fetchData = async() => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/flashcards/${deckId}`,
          {
            params: { deckId: deckId },
            withCredentials: true, 
            headers: { 'Content-Type': 'application/json' },
          }
        );

        console.log('response from flashcards', response.data);
        console.log('response status',response);
        setCards(response?.data.flashcards);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const handleNextCard = async() => {
    //setIsAnswerShown((prev) => !prev);
    //setCurrentCardIndex((prevIndex) => prevIndex + 1);
    const utcTime = new Date().toISOString();
    console.log({utcTime});
    const date = new Date(utcTime);
    date.setUTCSeconds(date.getUTCSeconds() + 10);
    console.log('new time',date.toISOString());

  };  

  const handleClick = () => {
    setIsAnswerShown((prev) => !prev);
  };

  return (
    <div>
      <Navigation/>
      {currentCardIndex < cards.length && (
        <Flashcard card={cards[currentCardIndex]} onNextCard={handleNextCard} handleClick={handleClick} isAnswerShown={isAnswerShown}/>
      )}
    </div>
  );
}

export default Flashcards