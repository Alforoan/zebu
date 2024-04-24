/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import './Deck.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';

const Deck = ({ deck, handleDelete }) => {
  const { deckId, setDeckId } = useContext(IsLoggedInContext);

  const [newName, setNewName] = useState(deck.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleRename = async () => {
    try {
      await axios.put('http://localhost:3000/api/user/decks/rename', {
        id: deck.id,
        newName,
      });

      deck.name = newName;
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setDeckId(deck.id);
    window.open(`/flashcards/${deck.id}`)
  };

  return (
    <div className='deck-container'>
      {isEditing ? (
        <>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'lightblue',
                padding: '0px 2px',
              }}
              onClick={handleClick}
            >
              {deck.name}
            </button>
       

          <button className='rename-btn' onClick={() => setIsEditing(true)}>
            Rename
          </button>
          <button className='delete-btn' onClick={() => handleDelete(deck.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Deck;
