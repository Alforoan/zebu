/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './Flashcard.css'

const Flashcard = ({card, onNextCard, isAnswerShown, handleClick}) => {

  
  


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
          <p style={{ marginTop: '2rem' }}>{card.front}</p>
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
          <p style={{ marginTop: '2rem' }}>{card.front}</p>
          <p>{card.back}</p>
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button onClick={handleClick}>Hide Answer</button>
            <div>
              <div style={{ display: 'flex', marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>&lt;10m</span>
                  <button onClick={(e) => onNextCard(e, card.id)} className='difficulty-btn'>
                    Easy
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>&lt;5m</span>
                  <button onClick={onNextCard} className='difficulty-btn'>
                    Medium
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ textAlign: 'center' }}>&lt;1m</span>
                  <button onClick={onNextCard} className='difficulty-btn'>
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
}

export default Flashcard