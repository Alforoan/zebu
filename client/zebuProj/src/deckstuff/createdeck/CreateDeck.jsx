/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import './CreateDeck.css'
import axios from 'axios';

const CreateDeck = ({
  setModalIsOpen,
  decks,
  setDecks,
  setDeckName,
  deckName,
  setIsDeckAdded,
  modalIsOpen,
}) => {
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef(null);


  useEffect(() => {
    modalIsOpen ? inputRef.current.focus() : '';
  }, [modalIsOpen])

  const handleAdd = async () => {
    console.log('DECKNAME', deckName);
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    try {
      if (deckName && deckName.length > 0) {
        const name = { name: deckName };
        const response = await axios.post(
          'http://localhost:3000/api/user/decks',
          JSON.stringify(name),
          config
        );
        console.log('NEW DECK', response);
        setDecks((prev) => [...prev, name]);
        setIsDeckAdded(true);
        setTimeout(() => {
          setIsDeckAdded(false);
        }, 1000);
      } else {
        setErrMsg('Fill in the field!');
        return;
      }
      
      setDeckName('');
      setModalIsOpen(false);
    } catch (error) {
      console.log(error);
      setErrMsg('Deck name already exists');
    }
  };
  

  return (
    <div className='create-deck-container'>
      <div style={{ marginBottom: '1rem' }}>
        <label className='deck-label' htmlFor='name'>
          Name:{' '}
        </label>
        <input
          ref={inputRef}
          className='deck-input-box'
          id='name'
          type='text'
          value={deckName}
          onChange={(e) => {
            setErrMsg('');
            setDeckName(e.target.value);
          }}
        />
      </div>
      {errMsg ? <p className='err-msg2'>{errMsg}</p> : ''}
      <div className='buttons-container'>
        <button onClick={() => handleAdd()} className='ok-btn'>
          OK
        </button>
        <button
          onClick={() => {
            setDeckName('');
            setModalIsOpen(false);
          }}
          className='cancel-btn2'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateDeck