import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../../navigation/Navigation'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import CreateDeck from '../../createdeck/CreateDeck';
import ReactDOMServer from 'react-dom/server';
import Modal from 'react-modal';
import Decks from '../decks/Decks';


const DeckPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  return (
    <div>
      <Navigation />
      <h1>Decks</h1>
      <button onClick={openModal}>Create Deck</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Create Deck Modal'
      >
        <CreateDeck setModalIsOpen={setModalIsOpen} decks={decks} setDecks={setDecks} setDeckName={setDeckName} deckName={deckName}/>
      </Modal>
      <Decks decks={decks} setDecks={setDecks}/>
    </div>
  );
};

export default DeckPage