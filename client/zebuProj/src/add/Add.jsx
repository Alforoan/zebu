import React, { useEffect, useState, useRef } from 'react'
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Decks from '../deckstuff/decks/Decks';
import DecksDropdown from '../deckstuff/decksdropdown/DecksDropdown';
import './Add.css'

const Add = () => {
  
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [deckId, setDeckId] = useState(null);
  const [errMsg, setErrMsg] = useState('');
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
        console.log({decks});
        
          setDecks(decks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDecks();
  }, [deckName])

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

  useEffect(() => {
    setErrMsg('');
  }, [frontText, backText])

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setDeckTitle(inputValue);
    if(inputValue.length > 0){
      const filteredDecks = decks.filter(deck => deck.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredDecks(filteredDecks);
    }else{
      setFilteredDecks(decks);
    }
    
    
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(!frontText || !backText){
      setErrMsg('Fill out both fields');
      return;
    }
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
            onChange={handleChange}
          />
        </div>
        {isOnFocus ? (
          <DecksDropdown
            decks={decks}
            filteredDecks={filteredDecks}
            setDeckId={setDeckId}
            setDeckName={setDeckName}
          />
        ) : (
          ''
        )}
        <form type='submit' onSubmit={handleSubmit}>
          <div>
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
          {errMsg && <p className='err-msg'>{errMsg}</p>}
          <button className='add-btn'>Add</button>
        </form>
      </div>
    </main>
  );
}

export default Add