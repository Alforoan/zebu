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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexArrowKeys, setSelectedIndexArrowKeys] = useState(-1);
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
      
        const sortedDecks = decks.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setFilteredDecks(sortedDecks);
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
  }, [isOnFocus, selectedIndexArrowKeys]);

  useEffect(() => {
    filteredDecks.map((deck, index) => {
      if(deck.id === parseInt(id)){
        setSelectedIndex(index);
      }})
  }, [filteredDecks])

  useEffect(() => {
    
  }, [filteredDecks, selectedIndexArrowKeys]);

  useEffect(() => {
    if(!isOnFocus){
      setSelectedIndexArrowKeys(-1);
    }else{
      setSelectedIndexArrowKeys(selectedIndex);
    }
  }, [isOnFocus, selectedIndex])

  const handleDeckSelect = (selectedDeck) => {
    inputRef.current.value = '';
    setPermDeckId(selectedDeck.id);
    setDeckId(selectedDeck.id);
    setDeckName(selectedDeck.name);
    navigate(`/add/${selectedDeck.id}`);
    filteredDecks.map((deck, index) => {
      if(selectedDeck.id === deck.id){
        setSelectedIndex(index);
        return;
      }
    })
  };

  let max = filteredDecks.length;



  const handleKeyDown = (e) => {
    if (!isOnFocus) {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndexArrowKeys((prevIndex) =>
          prevIndex === 0 ? max - 1 : prevIndex - 1
        );
        console.log({ selectedIndexArrowKeys });
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndexArrowKeys((prevIndex) =>
          prevIndex === max - 1 ? 0 : prevIndex + 1
        );
        console.log({selectedIndexArrowKeys});
        break;
      case 'Enter':
        console.log({selectedIndexArrowKeys});
        console.log('deck at entered index', filteredDecks[selectedIndexArrowKeys]);
        handleDeckSelect(filteredDecks[selectedIndexArrowKeys]);
        setIsOnFocus(false);
        break;
      default:
        break;
    }
  };


  const handleChange = (e) => {
    let inputValue = e.target.value;
    setDeckTitle(inputValue);
    if(inputValue.length > 0){
      setIsOnFocus(true);
      const filteredDecks = decks.filter(deck => deck.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredDecks(filteredDecks);
      setSelectedIndex(0);
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
        <div className='deck-add-container'>
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
            setFilteredDecks={setFilteredDecks}
            setDeckId={setDeckId}
            setDeckName={setDeckName}
            handleDeckSelect={handleDeckSelect}
            selectedIndex={selectedIndex}
            selectedIndexArrowKeys={selectedIndexArrowKeys}
            isOnFocus={isOnFocus}
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
                onInput={(e) => setFrontText(e.target.innerText)}
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
                onInput={(e) => setBackText(e.target.innerText)}
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