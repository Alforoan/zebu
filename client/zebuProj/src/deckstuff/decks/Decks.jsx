/* eslint-disable react/prop-types */
import React from 'react'
import Deck from '../deck/Deck';

const Decks = ({ decks, setDecks }) => {
  
  const handleDelete = (id) => {
    const filteredDecks = decks.filter((deck, index) => index != id);
    setDecks(filteredDecks);
    console.log({filteredDecks});
  }

  return (
    <div>
      {decks.map((deck, index) => (
        <Deck key={index} deck={deck} handleDelete={handleDelete} id={index}/>
      ))}
    </div>
  );
};


export default Decks