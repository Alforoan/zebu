/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './Flashcard.css'

const Flashcard = ({
  card,
  onNextCard,
  isAnswerShown,
  handleClick,
  setFontSize,
  fontSize,
  setCardId,
  id
}) => {

  useEffect(() => {
    setCardId(id)
  }, [id])
 

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
            {card.front}
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
              {card.front}
            </p>
            <p
              className='back'
              style={{ maxWidth: '65vw', fontSize: `${fontSize}px` }}
            >
              {card.back}
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
                  <span style={{ textAlign: 'center' }}>&lt;10m</span>
                  <button
                    onClick={(e) => onNextCard(e, card.id)}
                    className='difficulty-btn'
                  >
                    Easy
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>&lt;5m</span>
                  <button
                    onClick={(e) => onNextCard(e, card.id)}
                    className='difficulty-btn'
                  >
                    Medium
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>&lt;1m</span>
                  <button
                    onClick={(e) => onNextCard(e, card.id)}
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