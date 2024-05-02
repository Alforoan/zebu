/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './Flashcard.css'
import axios from 'axios';

const Flashcard = ({
  card,
  onNextCard,
  isAnswerShown,
  handleClick,
  setFontSize,
  fontSize,
  setCardId,
  id,
  setReviewCount,
  setPrevDifficulty,
  cardTimeEasy,
  cardTimeMedium,
  cardTimeHard,
  reviewCount
}) => {

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    setCardId(id)
  }, [id])

  useEffect(() => {
    const fetchCard = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/edit', {...config, params:{id: id}});
        const times = response?.data?.flashcard?.times;
        const status = response?.data?.flashcard?.status;
        
        if(status !== null){
          setPrevDifficulty(status);
        }

        setReviewCount(times);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, [id])
 
  console.log({cardTimeEasy});
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!isAnswerShown ? (
        <>
          <p
            style={{
              marginTop: '2rem',
              maxWidth: '65vw',
              fontSize: `${fontSize}px`,
            }}
            className='front'
          >
            {card?.front}
          </p>
          <div
            style={{
              position: 'fixed',
              bottom: '6.3rem',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button onClick={handleClick}>Show Answer</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '8rem' }}>
            <p
              style={{
                marginTop: '2rem',
                maxWidth: '65vw',
                fontSize: `${fontSize}px`,
              }}
              className='front'
            >
              {card?.front}
            </p>
            <div className='line'></div>
            <p
              className='back'
              style={{ maxWidth: '65vw', fontSize: `${fontSize}px` }}
            >
              {card?.back}
            </p>
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              paddingBottom: '2rem',
              paddingTop: '1rem',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'white',
            }}
          >
            <button onClick={handleClick}>Hide Answer</button>
            <div>
              <div style={{ display: 'flex', marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>
                    &lt;{reviewCount === 0 ? '10m' : cardTimeEasy}
                  </span>
                  <button
                    onClick={(e) => onNextCard(e, card?.id)}
                    className='difficulty-btn'
                  >
                    Easy
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>
                    &lt;{reviewCount === 0 ? '3m' : cardTimeMedium}
                  </span>
                  <button
                    onClick={(e) => onNextCard(e, card?.id)}
                    className='difficulty-btn'
                  >
                    Medium
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>
                    &lt;{reviewCount === 0 ? '1m' : cardTimeHard}
                  </span>
                  <button
                    onClick={(e) => onNextCard(e, card?.id)}
                    className='difficulty-btn'
                  >
                    Hard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Flashcard