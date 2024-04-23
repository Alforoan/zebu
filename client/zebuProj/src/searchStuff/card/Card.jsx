/* eslint-disable react/prop-types */
import React from 'react'
import './Card.css'

const Card = ({card}) => {
  return (
    <main className='main-container'>
      <button className='edit-btn'>Edit</button>
      <div className='card-container'>
        <span className='front-text'>{card?.front}</span>
        <span className='back-text'>{card?.back}</span>
      </div>
    </main>
  );
}

export default Card