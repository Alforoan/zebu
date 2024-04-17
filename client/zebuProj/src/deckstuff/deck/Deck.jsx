import React from 'react'
import './Deck.css'

const Deck = ({deck, handleDelete,id}) => {



  return (
    <div className='deck-container'>
      {deck}
      <button className='delete-btn' onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  )
}

export default Deck