import React from 'react'
import './FlashcardPanel.css'

const FlashcardPanel = () => {
  return (
    <div className='container'>
      <div>
        <button className='side-btn'>Edit</button>
        <button className='side-btn'>+</button>
        <button className='side-btn'>-</button>
      </div>
      <div className='difficulty-container'>
        <p className='difficulty'>E:</p>
        <p className='difficulty'>M:</p>
        <p className='difficulty'>H:</p>
      </div>
    </div>
  );
}

export default FlashcardPanel