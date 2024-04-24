import React, { useEffect, useState, useRef } from 'react'
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Decks from '../deckstuff/decks/Decks';
import DecksDropdown from '../deckstuff/decksdropdown/DecksDropdown';
import './Add.css'

const Add = () => {
  
  const [decks, setDecks] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [deckId, setDeckId] = useState(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
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

  useEffect(() => {
    frontRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDeckName = deckName;
    const deckID = deckId;
    const front = frontText;
    const back = backText;
    const data = { deck: selectedDeckName, deckId: deckID, front: front, back: back };
    try {
      const response = await axios.post('http://localhost:3000/api/user/add', data, config);
      frontRef.current.innerHTML = '';
      backRef.current.innerHTML = '';
      setFrontText('');
      setBackText('');
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <main style={{ height: '95vh' }}>
      <Navigation />
      <div className='front-back-container'>
        <div className='deck-container'>
          <label htmlFor='name'>Deck </label>
          <input
            autoComplete='off'
            className='deck-input'
            id='name'
            type='text'
            onFocus={() => setIsOnFocus(true)}
            ref={inputRef}
            placeholder={deckName}
          />
        </div>
        {isOnFocus ? (
          <DecksDropdown
            decks={decks}
            setDeckId={setDeckId}
            setDeckName={setDeckName}
          />
        ) : (
          ''
        )}
        <form type='submit' onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor='front'>Front </label>
            <input
              id='front'
              type='text'
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
            /> */}
            <div className='front-container'>
              <p>Front</p>
              <div
                ref={frontRef}
                className='textarea2'
                contentEditable='true'
                onInput={(e) => setFrontText(e.target.innerHTML)}
              ></div>
            </div>
          </div>
          <div>
            {/* <label htmlFor='back'>Back </label>
            <input
              id='back'
              type='text'
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
            /> */}
            <div className='back-container'>
              <p>Back</p>
              <div
                ref={backRef}
                className='textarea2'
                contentEditable='true'
                onInput={(e) => setBackText(e.target.innerHTML)}
              >
               
              </div>
            </div>
          </div>
          <button className='add-btn'>Add</button>
        </form>
      </div>
    </main>
  );
}

export default Add