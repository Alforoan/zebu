/* eslint-disable react/prop-types */
import React, {useContext, useEffect, useRef, useState} from 'react'
import './Deck.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Modal from 'react-modal';
import MyModal from '../../components/Modal';
import { LuRefreshCw } from 'react-icons/lu';

const Deck = ({deck,decks, setDecks}) => {

  const { permDeckId, setPermDeckId } = useContext(IsLoggedInContext);

  const [newName, setNewName] = useState(deck.name);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    if(isEditing){
      editRef.current.focus();
    }
  }, [isEditing])

  const handleRename = async () => {
    try {
      await axios.put('http://localhost:3000/api/user/decks/rename', {
        id: deck.id,
        newName: newName,
      }, config);
      console.log(deck.id);
      console.log(newName);
      deck.name = newName;
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isEditing) {
        setIsEditing(false);
      }else if(event.key === 'Enter' && isEditing){
        handleRename();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing, newName]);

  const handleClick = () => {
    console.log("button clicked");
  }

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    try {
      const deckToDelete = decks.find((deck) => deck.id === permDeckId);
      console.log({ deckToDelete });
      const deckName = deckToDelete?.name;
      const response = await axios.post(
        'http://localhost:3000/api/user/decks/delete',
        { name: deckName },
        config
      );
      console.log(response.data.message);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== permDeckId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmRefresh = async() => {
    
    try {
      const response  = await axios.put(`http://localhost:3000/api/user/decks/${permDeckId}`, JSON.stringify({id:permDeckId}) ,config);
      console.log('response from refresh', response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteModal = (e,id) => {
    const btnPosition = e.target.getBoundingClientRect();
    setModalPosition(btnPosition);
    setPermDeckId(id);
    setIsModalOpen(prev => !prev);
  }

  const handleRefreshModal = (e, id) => {
    setPermDeckId({id});
    const answer = prompt('This will refresh all the cards, are you sure? \n Type Y(y) confirm')
    if(answer.toLowerCase() === 'y'){
      handleConfirmRefresh();
    }
  };

  return (
    <div className='deck-container'>
      {isEditing ? (
        <main className='rename-container'>
          <div>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className='edit-input'
              ref={editRef}
            />
          </div>
          
          <div className='save-cancel-container'>
            <button onClick={handleRename} className='save-btn'>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className='cancel-btn'>
              Cancel
            </button>
          </div>
        </main>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              title='Makes all cards available'
              className='refresh-btn'
              onClick={() => handleRefreshModal()}
            >
              <LuRefreshCw />
            </button>
            <Link to={`/flashcards/${deck.id}`}>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#1F51FF',
                  padding: '0px 2px',
                  fontSize: '1.2rem',
                }}
                onClick={handleClick}
              >
                {deck.name}
              </button>
            </Link>
          </div>
          <div className='button-container'>
            {/* <button
              title='Makes all cards available'
              className='refresh-btn'
              onClick={() => handleRefresh(deck.id)}
            >
              <LuRefreshCw/>
            </button> */}
            <button
              title='Rename the deck'
              className='rename-btn button-89'
              onClick={() => setIsEditing(true)}
            >
              Rename
            </button>
            <button
              title='Delete the deck'
              className='delete-btn'
              onClick={(e) => handleDeleteModal(e, deck.id)}
            >
              <img src='/images/delete.png' width='40px' height='40px' />
            </button>
            <MyModal
              modalPosition={modalPosition}
              isOpen={isModalOpen}
              closeModal={handleCloseModal}
              handleConfirmDelete={handleConfirmDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Deck