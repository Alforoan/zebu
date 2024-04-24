/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import Deckdropdown from '../deckdropdown/Deckdropdown';
import './DecksDropdown.css'

const DecksDropdown = ({ decks,filteredDecks,handleDeckSelect, setDeckName, setDeckId }) => {
  const handleClick = () => {
    console.log('something clicked');
  };

  return (
    <div className='decks-container'>
      {filteredDecks.map((deck, index) => (
        <Deckdropdown key={index} setDeckId={setDeckId} deck={deck} setDeckName={setDeckName} handleDeckSelect={handleDeckSelect}/>
      ))}
    </div>
  );
};

export default DecksDropdown;