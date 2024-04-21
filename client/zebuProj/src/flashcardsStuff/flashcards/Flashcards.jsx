import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Flashcard from '../flashcard/Flashcard';
import { useParams } from 'react-router-dom';

const Flashcards = () => {

  const { setDeckId } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
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

  const handleClick = () => {
    
  }

  return (
    <div>
      {cards.map((card, index) => (
        <Flashcard key={index} card={card}/>
      ))}
    </div>
  );
}

export default Flashcards