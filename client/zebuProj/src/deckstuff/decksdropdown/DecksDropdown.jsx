/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import Deckdropdown from '../deckdropdown/Deckdropdown';
import './DecksDropdown.css'

const DecksDropdown = ({ decks, setDeckName }) => {
  const handleClick = () => {
    console.log('something clicked');
  };

  return (
    <div className='decks-container'>
      {decks.map((deck, index) => (
        <Deckdropdown key={index} deck={deck} setDeckName={setDeckName}/>
        // <button key={index} onClick={handleClick}>
        //   {deck.name}
        // </button>
      ))}
    </div>
  );
};

export default DecksDropdown;