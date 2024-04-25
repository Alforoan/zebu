/* eslint-disable react/prop-types */
import React, {useContext, useState} from 'react'
import './Deck.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import IsLoggedInContext from '../../context/IsLoggedInProvider';

const Deck = ({deck, handleDelete}) => {

  const { deckId, setDeckId } = useContext(IsLoggedInContext);

  const [newName, setNewName] = useState(deck.name);
  const [isEditing, setIsEditing] = useState(false);

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

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
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <Link to={`/flashcards/${deck.id}`}>
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
          </Link>
          <button className='refresh-btn' onClick={() => handleRefresh(deck.id)}>
            Refresh
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
}

export default Deck