/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import Deck from '../deck/Deck';
import axios from 'axios';

const Decks = ({ decks, setDecks, inputValue, isDeckAdded, modalIsOpen }) => {
  

  const [filteredDecks, setFilteredDecks] = useState([]);

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/decks', config);
        const fetchedDecks = response?.data?.data;
        const sortedDecks = fetchedDecks.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDecks(sortedDecks);
        setFilteredDecks(sortedDecks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [isDeckAdded])

  useEffect(() => {
    const newDecks = decks.filter(deck => deck.name.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredDecks(newDecks);
    console.log({newDecks});
  }, [inputValue])



  // const handleDelete = async(id) => {
    
  //   try {
  //     const deckToDelete = decks.find((deck) => deck.id === id);
  //     console.log({deckToDelete});
  //     const deckName = deckToDelete?.name;
  //      const response = await axios.post('http://localhost:3000/api/user/decks/delete', { name: deckName }, config)
  //      console.log(response.data.message);
  //      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
    
    
  // }


  return (
    <div>
      {inputValue
        ? filteredDecks.map((deck, index) => (
            <Deck
              key={index}
              deck={deck}
              decks={decks}
              setDecks={setDecks}
              modalIsOpen={modalIsOpen}
            />
          ))
        : decks.map((deck, index) => (
            <Deck
              key={index}
              deck={deck}
              decks={decks}
              setDecks={setDecks}
              modalIsOpen={modalIsOpen}
            />
          ))}
    </div>
  );
};


export default Decks