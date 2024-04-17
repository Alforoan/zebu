import React, { useState } from 'react'
import './CreateDeck.css'

const CreateDeck = ({setModalIsOpen, decks, setDecks, setDeckName, deckName}) => {

  const handleAdd = () => {
    console.log({deckName});
    if(deckName.length > 0){
      setDecks(prev => [...prev, deckName]);
      setDeckName('');
      setModalIsOpen(false);
    }

  };
  

  return (
    <div>
      <div>
        <label htmlFor='name'>Name: </label>
        <input id='name' type='text' value={deckName} onChange={(e) => {
          console.log(e.target.value);
          setDeckName(e.target.value)
          }}/>
      </div>
      
      <div>
        <button onClick={() => handleAdd()}>OK</button>
        <button onClick={() => {setDeckName(''); setModalIsOpen(false);}}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateDeck