/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import Deckdropdown from '../deckdropdown/Deckdropdown';
import './DecksDropdown.css'

const DecksDropdown = ({ decks,filteredDecks,handleDeckSelect, setDeckName,selectedIndex, setDeckId, isOnFocus, selectedIndexArrowKeys }) => {

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOnFocus && dropdownRef.current) {
      const dropdownHeight = dropdownRef.current.clientHeight;
      const itemHeight = 50; 

      const topDistance = selectedIndexArrowKeys * itemHeight;
      const bottomDistance = (selectedIndexArrowKeys + 1) * itemHeight;

      if (
        topDistance < dropdownRef.current.scrollTop ||
        bottomDistance > dropdownRef.current.scrollTop + dropdownHeight
      ) {
        let scrollToPosition;
        if (selectedIndexArrowKeys === 0) {
          scrollToPosition = 0;
        } else if (
          bottomDistance >
          dropdownRef.current.scrollTop + dropdownHeight
        ) {
          scrollToPosition = topDistance - dropdownHeight + itemHeight;
        } else {
          scrollToPosition = topDistance;
        }
        dropdownRef.current.scrollTop = scrollToPosition;
      }
    }
  }, [isOnFocus, selectedIndexArrowKeys]);

  return (
    <div className='decks-container' ref={dropdownRef}>
      {filteredDecks.map((deck, index) => (
        <Deckdropdown key={index} index={index} setDeckId={setDeckId} deck={deck} setDeckName={setDeckName} handleDeckSelect={handleDeckSelect} isSelected={selectedIndex === index} isSelectedArrow={selectedIndexArrowKeys === index}/>
      ))}
    </div>
  );
};

export default DecksDropdown;