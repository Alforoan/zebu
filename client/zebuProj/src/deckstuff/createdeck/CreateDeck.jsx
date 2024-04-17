import React, { useState } from 'react'
import './CreateDeck.css'
import axios from 'axios';

const CreateDeck = ({setModalIsOpen, decks, setDecks, setDeckName, deckName}) => {

  const handleAdd = async() => {
    console.log('DECKNAME',deckName);
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    try {
      if(deckName && deckName.length > 0){
      const name = {name:deckName};
      const response = await axios.post('http://localhost:3000/api/user/decks', JSON.stringify(name), config);
      console.log('NEW DECK', response);
      } 
      
      setDeckName('');
      setModalIsOpen(false);
      }
    catch (error) {
      console.log(error);
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