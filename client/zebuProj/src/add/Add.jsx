import React, { useEffect, useState, useRef } from 'react'
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Decks from '../deckstuff/decks/Decks';
import DecksDropdown from '../deckstuff/decksdropdown/DecksDropdown';

const Add = () => {
  
  const [decks, setDecks] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [deckId, setDeckId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDeckName = deckName;
    const deckID = deckId;
    const front = frontText;
    const back = backText;
    const data = { deck: selectedDeckName, deckId: deckID, front: front, back: back };
    try {
      const response = await axios.post('http://localhost:3000/api/user/add', data, config);
      setFrontText('');
      setBackText('');
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <main style={{ height: '95vh' }}>
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
      {isOnFocus ? (
        <DecksDropdown decks={decks} setDeckId={setDeckId} setDeckName={setDeckName} />
      ) : (
        ''
      )}
      <form type='submit' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='front'>Front </label>
          <input
            id='front'
            type='text'
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='back'>Back </label>
          <input
            id='back'
            type='text'
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
          />
        </div>
        <button>Add</button>
      </form>
    </main>
  );
}

export default Add