/* eslint-disable react/prop-types */
import React, {useContext, useEffect, useRef, useState} from 'react'
import './Deck.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';

const Deck = ({deck, handleDelete}) => {

  const { deckId, setDeckId } = useContext(IsLoggedInContext);

  const [newName, setNewName] = useState(deck.name);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef(null);

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

  const handleRefresh = async(id) => {
    try {
      const response  = await axios.put(`http://localhost:3000/api/user/decks/${id}`, JSON.stringify({id:id}) ,config);
      console.log('response from refresh', response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='deck-container'>
      {isEditing ? (
        <>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} className='edit-input' ref={editRef}/>
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
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
              onClick={() => handleDelete(deck.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Deck