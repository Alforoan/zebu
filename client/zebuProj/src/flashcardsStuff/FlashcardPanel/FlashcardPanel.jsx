import React from 'react'
import './FlashcardPanel.css'

const FlashcardPanel = ({
  easy,
  medium,
  hard,
  handleEnlargeFont,
  handleReduceFont,
}) => {
  return (
    <div className='container'>
      <div>
        <button className='side-btn'>Edit</button>
        <button className='side-btn plus' onClick={handleEnlargeFont}>+</button>
        <button className='side-btn minus' onClick={handleReduceFont}>-</button>
      </div>
      <div className='difficulty-container'>
        <p className='difficulty'>E: {easy}</p>
        <p className='difficulty'>M: {medium}</p>
        <p className='difficulty'>H: {hard}</p>
      </div>
    </div>
  );
};

export default FlashcardPanel