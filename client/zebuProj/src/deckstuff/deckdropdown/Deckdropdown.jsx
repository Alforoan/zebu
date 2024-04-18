/* eslint-disable react/prop-types */
import React from 'react'
import './Deckdropdown.css'

const Deckdropdown = ({deck, setDeckName}) => {

  const handleClick = () => {
    console.log('Button clicked:', deck.name);
  };

  return (
   
    <button className='deck-btn' onClick={handleClick}>{deck.name}</button>
   
  );
}

export default Deckdropdown