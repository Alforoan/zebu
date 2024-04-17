/* eslint-disable react/prop-types */
import React, {useEffect} from 'react'
import Deck from '../deck/Deck';
import axios from 'axios';

const Decks = ({ decks, setDecks }) => {
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/decks');

       

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const handleDelete = (id) => {
    const filteredDecks = decks.filter((deck, index) => index != id);
    setDecks(filteredDecks);
    console.log({filteredDecks});
  }

  return (
    <div>
      {decks.map((deck, index) => (
        <Deck key={index} deck={deck} handleDelete={handleDelete} id={index}/>
      ))}
    </div>
  );
};


export default Decks