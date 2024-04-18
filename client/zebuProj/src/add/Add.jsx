import React, { useEffect, useState, useRef } from 'react'
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Decks from '../deckstuff/decks/Decks';
import DecksDropdown from '../deckstuff/decksdropdown/DecksDropdown';

const Add = () => {
  
  const [decks, setDecks] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [deckName, setDeckName] = useState('');
  const inputRef = useRef(null);
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchDecks = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/decks', config)
        console.log('possible response',response);
        const decks = response?.data?.data;
        setDecks(decks);
        console.log({decks});
        setDeckName(decks[0].name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDecks();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOnFocus(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <main style={{height:'95vh'}}>
      <Navigation />
      <div>
        <label htmlFor='name'>Deck </label>
        <input
          autoComplete='off'
          id='name'
          type='text'
          onFocus={() => setIsOnFocus(true)}
          ref={inputRef}
          placeholder={deckName}
        />
      </div>
      {
        isOnFocus ? <DecksDropdown decks={decks} setDeckName={setDeckName}/> : ''
      }
      <form type='submit'>
        <div>
          <label htmlFor='front'>Front </label>
          <input id='front' type='text' />
        </div>
        <div>
          <label htmlFor='back'>Back </label>
          <input id='back' type='text' />
        </div>
        <button>Add</button>
      </form>
    </main>
  );
}

export default Add