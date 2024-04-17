/* eslint-disable react/prop-types */
import React from 'react'
import './Deck.css'

const Deck = ({deck, handleDelete,id}) => {




  return (
    <div className='deck-container'>
     
      <button className='delete-btn' onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  )
}

export default Deck