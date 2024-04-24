import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Flashcard from '../flashcard/Flashcard';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../navigation/Navigation';
import FlashcardPanel from '../FlashcardPanel/FlashcardPanel';
import Edit from '../editFlashcards/Edit';

const Flashcards = () => {

  const { setDeckId } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isCardExist, setIsCardExist] = useState(true);
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [fontSize, setFontSize] = useState('28');
  const [cardId, setCardId] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const {id} = useParams();
  const navigate = useNavigate();

   const config = {
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
   };

  useEffect(() => {
    
    const fetchData = async() => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/flashcards/${id}`,
          {
            params: { deckId: id },
            withCredentials: true, 
            headers: { 'Content-Type': 'application/json' },
          }
        );
        
       
        const now = new Date();
        const flashcards = response?.data?.flashcards;
        let easyCount = 0;
        let mediumCount = 0;
        let hardCount = 0;
        flashcards.forEach(flashcard => {
          if(flashcard.status === 'Easy'){
            easyCount++;
          }else if (flashcard.status === 'Medium') {
            mediumCount++;
          }else{
            hardCount++;
          }
        })
        setEasy(easyCount);
        setMedium(mediumCount);
        setHard(hardCount);
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
  }, [currentCardIndex, easy, medium, hard])

  const handleNextCard = async(e, eachId) => {


    
    setIsAnswerShown((prev) => !prev);
    if(currentCardIndex === cards.length -1){
      setCurrentCardIndex(0);
    }else{
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
    let difficulty = e.target.textContent;
    let timeIncrementSeconds;

    switch (difficulty) {
      case 'Easy':
        timeIncrementSeconds = 15;
        setEasy((prev) => prev + 1);
        break;
      case 'Medium':
        timeIncrementSeconds = 30; 
        setMedium((prev) => prev + 1);
        break;
      case 'Hard':
        timeIncrementSeconds = 45; 
        setHard((prev) => prev + 1);
        break
      default:
        return;
    }


    const timeNowInUtc = new Date().toISOString();
    const date = new Date(timeNowInUtc);
    date.setUTCSeconds(date.getUTCSeconds() + timeIncrementSeconds)
    const nextScheduled = date.toISOString();

    const data = {cardId: eachId, deckId: id, lastAnswered: timeNowInUtc, nextScheduled: nextScheduled, status: difficulty }
    console.log('something here');
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

  const handleEdit = async() => {
   
    try {
      const response = await axios.get('http://localhost:3000/api/user/edit', {
        ...config,
        params: {
          id: cardId, 
        },
      });
      window.open(`/edit/${cardId}`, '_blank');

    } catch (error) {
      console.log('handle edit err');
      console.log(error);
    }
  }

  const handleEnlargeFont = () => {
    if (parseInt(fontSize) < 100) {
      setFontSize((prev) => parseInt(prev) + 10);
    }else{
      return;
    }
  };

  const handleReduceFont = () => {
    if(parseInt(fontSize) > 20){
      setFontSize((prev) => parseInt(prev) - 10);
    }else{
      return;
    }
  };




  const handleClick = () => {
    setIsAnswerShown((prev) => !prev);
  };

  return (
    <div>
      <Navigation />
      <FlashcardPanel
        easy={easy}
        medium={medium}
        hard={hard}
        handleEnlargeFont={handleEnlargeFont}
        handleReduceFont={handleReduceFont}
        handleEdit={handleEdit}
      />
      {isCardExist ? (
        cards.length > 0 && (
          <Flashcard
            card={cards[currentCardIndex]}
            onNextCard={handleNextCard}
            handleClick={handleClick}
            isAnswerShown={isAnswerShown}
            setFontSize={setFontSize}
            fontSize={fontSize}
            setCardId={setCardId}
            id={[cards[currentCardIndex].id][0]}
            setReviewCount={setReviewCount}
          />
        )
      ) : (
        <div>
          <h2>Congratulations!</h2>
          <p>Add more cards or refresh the deck to view flashcards again!</p>
        </div>
      )}
      {
        isEditVisible ?  <Edit cardId={cardId} /> : ''
      }
    </div>
    
  );
}

export default Flashcards