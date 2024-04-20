/* eslint-disable react/prop-types */
import React from 'react'
import './Deckdropdown.css'

const Deckdropdown = ({deck,setDeckId, setDeckName}) => {

  setDeckId(deck.id);
  
  const handleClick = (e) => {
    setDeckName(e.target.textContent);
  };

  return (
   
    <button className='deck-btn' onClick={handleClick}>{deck.name}</button>
   
  );
}

export default Deckdropdown