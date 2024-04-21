/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const Flashcard = ({card}) => {

  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const handleClick = () => {
    setIsAnswerShown(prev => !prev);
  }

  return (
    <div>
      {!isAnswerShown ? (
        <>
          <p>{card.front}</p>
          <button onClick={handleClick}>Show Answer</button>
        </>
      ) : (
        <>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <button onClick={handleClick}>Hide Answer</button>
        </>
      )}
    </div>
  );
}

export default Flashcard