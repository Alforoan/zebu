import React, { useEffect, useState, useRef, useContext } from 'react'
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import Decks from '../deckstuff/decks/Decks';
import DecksDropdown from '../deckstuff/decksdropdown/DecksDropdown';
import './Add.css'
import { useNavigate, useParams } from 'react-router-dom';
import IsLoggedInContext from '../context/IsLoggedInProvider';

const Add = () => {
  
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [deckId, setDeckId] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const inputRef = useRef(null);
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  const {permDeckId, setPermDeckId } = useContext(IsLoggedInContext);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/decks', config)
        //console.log('possible response',response);
        const decks = response?.data?.data;
        if(id){
          decks.forEach(deck => {
          if(deck.id === parseInt(id)){
            setPermDeckId(id);
            setDeckName(deck.name);
            return;
          }
        })
        }
        
        setFilteredDecks(decks);
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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  


  const handleDeckSelect = (selectedDeck) => {
    console.log({selectedDeck});
    inputRef.current.value = selectedDeck.name;
    setPermDeckId(selectedDeck.id);
    
    console.log({permDeckId});
    setDeckId(selectedDeck.id);
    setDeckName(selectedDeck.name);
    navigate(`/add/${selectedDeck.id}`);
    console.log('isonfocus inside deck select',isOnFocus);
  };



  const handleKeyDown = (e) => {
    if (!isOnFocus || filteredDecks.length === 0) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault(); 
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case 'ArrowDown':
        e.preventDefault(); 
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredDecks.length - 1)
        );
        break;
      case 'Enter':
        if (selectedIndex !== -1) {
          handleDeckSelect(filteredDecks[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };


  const handleChange = (e) => {
    let inputValue = e.target.value;
    setDeckTitle(inputValue);
    if(inputValue.length > 0){
      const filteredDecks = decks.filter(deck => deck.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredDecks(filteredDecks);
      setSelectedIndex(-1);
    }else{
      setFilteredDecks(decks);
      setIsOnFocus(true);
    }
    
    
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(!frontText || !backText){
      setErrMsg('Fill out both fields');
      return;
    }
    const selectedDeckName = deckName;
    console.log({selectedDeckName});
    const front = frontText;
    const back = backText;
    const data = { deck: selectedDeckName, deckId:permDeckId, front: front, back: back };
    try {
      const response = await axios.post('http://localhost:3000/api/user/add', data, config);
      frontRef.current.innerHTML = '';
      backRef.current.innerHTML = '';
      setSuccessMsg('Successfully added!')
      setTimeout(() => {
        setSuccessMsg('');
      }, 1500);
      setFrontText('');
      setBackText('');
    } catch (error) {
      console.log('error is happening');
      console.log(error);
    }
    
  }

  const handleInputClick = () => {
    setIsOnFocus(prev => !prev);
  }



  return (
    <main style={{ height: '95vh' }}>
      <Navigation deckName={deckName}/>
      <div className='front-back-container'>
        <div className='deck-container'>
          <label htmlFor='name'>Deck </label>
          <input
            autoComplete='off'
            className='deck-input'
            id='name'
            type='text'
            ref={inputRef}
            placeholder={deckName}
            onChange={handleChange}
            onClick={handleInputClick}
          />
        </div>
        {isOnFocus ? (
          <DecksDropdown
            decks={decks}
            filteredDecks={filteredDecks}
            setDeckId={setDeckId}
            setDeckName={setDeckName}
            handleDeckSelect={handleDeckSelect}
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
          {successMsg && <p className='success-msg'>{successMsg}</p>}
          <button className='add-btn'>Add</button>
        </form>
      </div>
    </main>
  );
}

export default Add