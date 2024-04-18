/* eslint-disable react/prop-types */
import React from 'react'
import './Deck.css'

const Deck = ({deck, handleDelete}) => {




  return (
    <div className='deck-container'>
      {deck.name}
      <button className='delete-btn' onClick={() => handleDelete(deck.id)}>
        Delete
      </button>
    </div>
  )
}

export default Deck