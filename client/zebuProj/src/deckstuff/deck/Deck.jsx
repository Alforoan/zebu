/* eslint-disable react/prop-types */
import React, {useContext, useEffect, useRef, useState} from 'react'
import './Deck.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';
import Modal from 'react-modal';
import MyModal from '../../components/Modal';

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

  const handleRefresh = async(id) => {
    try {
      const response  = await axios.put(`http://localhost:3000/api/user/decks/${id}`, JSON.stringify({id:id}) ,config);
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

  return (
    <div className='deck-container'>
      {isEditing ? (
        <>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className='edit-input'
            ref={editRef}
          />
          <div>
            <button onClick={handleRename} className='save-btn'>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className='cancel-btn'>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to={`/flashcards/${deck.id}`}>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#1F51FF',
                padding: '0px 2px',
                fontSize: '1rem',
              }}
              onClick={handleClick}
            >
              {deck.name}
            </button>
          </Link>
          <div>
            <button
              className='refresh-btn'
              onClick={() => handleRefresh(deck.id)}
            >
              Refresh
            </button>
            <button className='rename-btn' onClick={() => setIsEditing(true)}>
              Rename
            </button>
            <button
              className='delete-btn'
              onClick={(e) => handleDeleteModal(e, deck.id)}
            >
              Delete
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