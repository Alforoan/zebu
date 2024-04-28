/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './Deckdropdown.css'

const Deckdropdown = ({deck,setDeckId,handleDeckSelect, isSelected, isSelectedArrow}) => {

  
  

  

  return (
    <button
      className='deck-btn'
      style={{
        backgroundColor: isSelected
          ? '#30C9FF'
          : isSelectedArrow
          ? '#D0E9FF'
          : '',
      }}
      onClick={() => {
        handleDeckSelect(deck);
      }}
    >
      {deck.name}
    </button>
  );
}

export default Deckdropdown