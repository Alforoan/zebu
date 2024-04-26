/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import './FlashcardPanel.css'

const FlashcardPanel = ({
  easy,
  medium,
  hard,
  handleEnlargeFont,
  handleReduceFont,
  handleEdit,
  availableCount,
  isEditBtnDisabled
}) => {
  return (
    <div className='container'>
      <div>
        <button disabled={isEditBtnDisabled} className='side-btn' onClick={handleEdit}>Edit</button>
        <button className='side-btn plus' onClick={handleEnlargeFont}>+</button>
        <button className='side-btn minus' onClick={handleReduceFont}>-</button>
      </div>
      <div>
        Available Cards: {availableCount}
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