import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Flashcard from '../flashcard/Flashcard';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../navigation/Navigation';
import FlashcardPanel from '../FlashcardPanel/FlashcardPanel';
import Edit from '../editFlashcards/Edit';

const Flashcards = () => {

  const { setPermDeckId } = useContext(IsLoggedInContext);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isCardExist, setIsCardExist] = useState(true);
  const [noCardsMsg, setNoCardsMsg] = useState('');
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [fontSize, setFontSize] = useState('28');
  const [cardId, setCardId] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [availableCount, setAvailableCount] = useState(0);
  const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [prevDifficulty, setPrevDifficulty] = useState(null);
  const [cardTimeEasy, setCardTimeEasy] = useState('');
  const [cardTimeMedium, setCardTimeMedium] = useState('');
  const [cardTimeHard, setCardTimeHard] = useState('');
  const [cardTimeEasySeconds, setCardTimeEasySeconds] = useState(600);
  const [cardTimeMediumSeconds, setCardTimeMediumSeconds] = useState(180);
  const [cardTimeHardSeconds, setCardTimeHardSeconds] = useState(60);
  const [nextTime, setNextTime] = useState(null);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const {id} = useParams();
  const navigate = useNavigate();

   const config = {
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
   };

  useEffect(() => {
    setPermDeckId(id);
  }, [id])

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
        setAvailableCount(filteredCards.length);
        if(filteredCards.length > 0){
          setIsCardExist(true)
        }else{
          setIsCardExist(false);
        }
        setCards(filteredCards);
      } catch (error) {
        if(error.response.status === 404){
          setNoCardsMsg(
            <span>
              No cards in this deck!
              <br />
              Add more to the deck
            </span>
          );
          setIsEditBtnDisabled(true);
        }
        console.log(error);
      }
    }
    fetchData();
    // setInterval(() => {
    //   fetchData();
    // }, 1000);
    
  }, [currentCardIndex, easy, medium, hard])

  const randomNumberGenerator = (arr) => {
    const rand = Math.floor(Math.random() * arr.length);
    return rand === 0 ? 0 : rand - 1;
  };


  const handleNextCard = async(e, eachId) => {

    const randomIndex = randomNumberGenerator(cards);
    setIsAnswerShown((prev) => !prev);
    if(cards.length > 2){
      setCurrentCardIndex(randomIndex);
    }else{
      setCurrentCardIndex(0);
    }
    let difficulty = e.target.textContent;
    console.log('something first');
    let easyTime = cardTimeEasySeconds;
    let mediumTime = cardTimeMediumSeconds;
    let hardTime = cardTimeHardSeconds;
    if (difficulty === 'Easy' && reviewCount === 0 && prevDifficulty === null) {
      //cardTimeEasy = 10 * 60; // 10 minutes
      easyTime = 600;
      setCardTimeEasySeconds(easyTime);
      setEasy((prev) => prev + 1);
    } else if (
      difficulty === 'Medium' &&
      reviewCount === 0 &&
      prevDifficulty === null
    ) {
      //cardTimeMedium = 3 * 60; // 3 minutes
      mediumTime = 180;
      setCardTimeMediumSeconds(mediumTime);
      setMedium((prev) => prev + 1);
    } else if (
      difficulty === 'Hard' &&
      reviewCount === 0 &&
      prevDifficulty === null
    ) {
      hardTime = 60;
      //cardTimeHard = 60; // 1 minute
      setCardTimeHardSeconds(hardTime);
      setHard((prev) => prev + 1);
    }
  
    else if (prevDifficulty === 'Easy' && reviewCount >= 0) {
      if (difficulty === 'Easy') {
        easyTime *= 3;
        mediumTime *= 3;
        hardTime *= 3;
        setEasy((prev) => prev + 1);
      } else if (difficulty === 'Medium') {
        easyTime *= 0.6;
        mediumTime *= 0.6;
        hardTime *= 0.6;
        setMedium((prev) => prev + 1);
      } else if (difficulty === 'Hard') {
        easyTime *= 0.2;
        mediumTime *= 0.2;
        hardTime *= 0.2;
        setHard((prev) => prev + 1);
      }
    } else if (prevDifficulty === 'Medium' && reviewCount >= 0) {
      if (difficulty === 'Easy') {
        easyTime *= 1.5;
        mediumTime *= 1.5;
        hardTime *= 1.5;
        setEasy((prev) => prev + 1);
      } else if (difficulty === 'Medium') {
        mediumTime *= 1.1;
        easyTime *= 1.1;
        hardTime *= 1.1;
        setMedium((prev) => prev + 1);
      } else if (difficulty === 'Hard') {
        hardTime *= 0.3;
        mediumTime *= 0.3;
        easyTime *= 0.3;
        setHard((prev) => prev + 1);
      }
    } else if (prevDifficulty === 'Hard' && reviewCount >= 0) {
      if (difficulty === 'Easy') {
        easyTime *= 1.8;
        mediumTime *= 1.8;
        hardTime *= 1.8;
        setEasy((prev) => prev + 1);
      } else if (difficulty === 'Medium') {
        mediumTime *= 1.2;
        easyTime *= 1.2;
        hardTime *= 1.2;
        setMedium((prev) => prev + 1);
      } else if (difficulty === 'Hard') {
        hardTime *= 0.5;
        mediumTime *= 0.5;
        easyTime *= 0.5;
        setHard((prev) => prev + 1);
      }
    }


    let minEasyTime = Math.ceil(Math.min(easyTime, 604800));
    let minMediumTime = Math.ceil(Math.min(mediumTime, 604800));
    let minHardTime = Math.ceil(Math.min(hardTime, 604800));
    
    console.log({minEasyTime, minMediumTime, minHardTime});

    setCardTimeEasySeconds(minEasyTime);
    setCardTimeMediumSeconds(minMediumTime);
    setCardTimeHardSeconds(minHardTime);

    const timeNowInUtc = new Date().toISOString();
    console.log({timeNowInUtc});
    const date = new Date(timeNowInUtc);
    console.log({date});
    if (difficulty === 'Easy') {
      console.log('easy has been clicked');
      console.log({cardTimeEasy});
      date.setUTCSeconds(date.getUTCSeconds() + minEasyTime);
      console.log({ cardTimeEasy });
    } else if (difficulty === 'Medium') {
      date.setUTCSeconds(date.getUTCSeconds() + minMediumTime);
    } else {
      date.setUTCSeconds(date.getUTCSeconds() + minHardTime);
    }
    
    const nextScheduled = date?.toISOString();
    setNextTime(nextScheduled);
   
    const data = {cardId: eachId, deckId: id, lastAnswered: timeNowInUtc, nextScheduled: nextScheduled, status: difficulty, easy: minEasyTime, medium: minMediumTime, hard: minHardTime }
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
      <Navigation deckId={id}/>
      <FlashcardPanel
        easy={easy}
        medium={medium}
        hard={hard}
        handleEnlargeFont={handleEnlargeFont}
        handleReduceFont={handleReduceFont}
        handleEdit={handleEdit}
        availableCount={availableCount}
        isEditBtnDisabled={isEditBtnDisabled}
      />
      {isCardExist ? (
        cards.length > 0 && (
          <Flashcard
            nextTime={nextTime}
            card={cards[currentCardIndex]}
            onNextCard={handleNextCard}
            handleClick={handleClick}
            isAnswerShown={isAnswerShown}
            setFontSize={setFontSize}
            fontSize={fontSize}
            setCardId={setCardId}
            id={[cards[currentCardIndex]?.id]?.[0]}
            setReviewCount={setReviewCount}
            setPrevDifficulty={setPrevDifficulty}
            setCardTimeEasy={setCardTimeEasy}
            setCardTimeMedium={setCardTimeMedium}
            setCardTimeHard={setCardTimeHard}
            cardTimeEasy={cardTimeEasy}
            cardTimeMedium={cardTimeMedium}
            cardTimeHard={cardTimeHard}
            setCardTimeEasySeconds={setCardTimeEasySeconds}
            setCardTimeMediumSeconds={setCardTimeMediumSeconds}
            setCardTimeHardSeconds={setCardTimeHardSeconds}
            reviewCount={reviewCount}
          />
        )
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <h2 style={{ fontSize: '2rem' }}>Congratulations!</h2>
          <p style={{ fontSize: '1.5rem' }}>
            Add more cards or refresh the deck to view flashcards again!
          </p>
        </div>
      )}
      {noCardsMsg && (
        <p style={{ fontSize: '2rem', marginLeft: '25%', marginTop: '4rem' }}>
          {noCardsMsg}
        </p>
      )}
      {isEditVisible ? <Edit cardId={cardId} /> : ''}
    </div>
  );
}

export default Flashcards