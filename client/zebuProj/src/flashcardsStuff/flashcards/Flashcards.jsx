import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Flashcard from '../flashcard/Flashcard';
import { useParams } from 'react-router-dom';
import Navigation from '../../navigation/Navigation';
import FlashcardPanel from '../FlashcardPanel/FlashcardPanel';

const Flashcards = () => {

  const { setDeckId } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isCardExist, setIsCardExist] = useState(true);

  const {deckId} = useParams();

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
        
       
        const now = new Date();
        const flashcards = response?.data?.flashcards;
        const filteredCards = flashcards.filter((card) => {
          const nextScheduledTime = new Date(card.next_scheduled);
          return now > nextScheduledTime;
        });
        console.log({filteredCards});
        if(filteredCards.length > 1){
          setIsCardExist(true)
        }else{
          setIsCardExist(false);
        }
        setCards(filteredCards);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentCardIndex])

  const handleNextCard = async(e, id) => {


    setIsAnswerShown((prev) => !prev);
    if(currentCardIndex === cards.length -1){
      setCurrentCardIndex(0);
    }else{
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
    let difficulty = e.target.textContent;
    
    const timeNowInUtc = new Date().toISOString();
    const date = new Date(timeNowInUtc);
    date.setUTCSeconds(date.getUTCSeconds() + 15)
    const nextScheduled = date.toISOString();

    const data = {cardId: id, deckId: deckId, lastAnswered: timeNowInUtc, nextScheduled: nextScheduled, status: difficulty }

    try {
      const response = await axios.put(
        'http://localhost:3000/api/user/flashcards/:deckId',
        JSON.stringify(data),
        config
      );
      console.log('response from editing flashcard', response);
    } catch (error) {
      console.log(error);
    }


  };  

  const handleClick = () => {
    setIsAnswerShown((prev) => !prev);
  };

  return (
    <div>
      <Navigation />
      <FlashcardPanel/>
      {isCardExist ? (
        cards.length > 0 && (
          <Flashcard
            card={cards[currentCardIndex]}
            onNextCard={handleNextCard}
            handleClick={handleClick}
            isAnswerShown={isAnswerShown}
          />
        )
      ) : (
        <div>
          <h2>Congratulations!</h2>
          <p>Add more cards or refresh the deck to view flashcards again!</p>
        </div>
      )}
    </div>
  );
}

export default Flashcards