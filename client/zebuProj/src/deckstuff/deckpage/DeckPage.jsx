import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../../navigation/Navigation'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import CreateDeck from '../createdeck/CreateDeck';
import ReactDOMServer from 'react-dom/server';
import Modal from 'react-modal';
import Decks from '../decks/Decks';
import './DeckPage.css'


const DeckPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isDeckAdded, setIsDeckAdded] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const modalContentStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    marginBottom: '20px',
    width: '400px',
    height: '200px',
    overflow: 'hidden',
  };



  return (
    <div>
      <Navigation />
      <div className='deckPage-container'>
        <div className='deckTitle-container'>
          <h1>Decks</h1>
          <div className='search-create-container'>
            <label htmlFor="search-deck"></label>
            <input type="text" id='search-deck' placeholder='Search Deck' onChange={(e) => setInputValue(e.target.value)} value={inputValue} className='search-deck'/>
            <button className='create-deck-btn' onClick={openModal}>Create Deck</button>
          </div>
        </div>
        <Modal
        style={{content: modalContentStyles}}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Create Deck Modal'
        >
          <CreateDeck setModalIsOpen={setModalIsOpen} decks={decks} setDecks={setDecks} setDeckName={setDeckName} deckName={deckName} setIsDeckAdded={setIsDeckAdded} modalIsOpen={modalIsOpen}/>
        </Modal>
        <Decks decks={decks} setDecks={setDecks} inputValue={inputValue} isDeckAdded={isDeckAdded}/>
      </div>
    </div>
  );
};

export default DeckPage