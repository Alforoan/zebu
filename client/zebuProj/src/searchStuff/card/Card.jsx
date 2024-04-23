/* eslint-disable react/prop-types */
import React from 'react'
import './Card.css'
import axios from 'axios';

const Card = ({card}) => {

  const cardId = card.id;

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  const handleEdit = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/edit', {
        ...config,
        params: {
          id: cardId,
        },
      });
      console.log(response);
      window.open(`/edit/${cardId}`, '_blank');
    } catch (error) {
      console.log('handle edit err');
      console.log(error);
    }
  };

  return (
    <main className='main-container'>
      <button className='edit-btn' onClick={handleEdit}>Edit</button>
      <div className='card-container'>
        <span className='front-text'>{card?.front}</span>
        <span className='back-text'>{card?.back}</span>
      </div>
    </main>
  );
}

export default Card