/* eslint-disable react/prop-types */
import React from 'react'
import './Deckdropdown.css'

const Deckdropdown = ({deck,setDeckId,handleDeckSelect, setDeckName}) => {

  
  
  const handleClick = (e) => {
    
    setDeckId(deck.id);
    setDeckName(e.target.textContent);
  };

  return (
   
    <button className='deck-btn' onClick={() => handleDeckSelect(deck)}>{deck.name}</button>
   
  );
}

export default Deckdropdown