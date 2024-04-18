/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import './Deck.css'
import axios from 'axios';

const Deck = ({deck, handleDelete}) => {

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
          <span>{deck.name}</span>
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