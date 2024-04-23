import React, { useEffect, useState } from 'react'
import Navigation from '../../navigation/Navigation'
import './Search.css'
import axios from 'axios'
import Card from '../card/Card'

const Search = () => {

  const [searchValue, setSearchValue] = useState('deck');
  const [searchInput, setSearchInput] = useState('');
  const [userId, setUserId] = useState(null);
  const [deckId, setDeckId] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/user/decks',
          config
        );
        const fetchedUserId = response?.data?.data[0]?.user_id;
        const fetchedDeckId = response?.data?.data[0]?.id;
        setUserId(fetchedUserId);
        setDeckId(fetchedDeckId);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('test');
    if(!searchInput){
      console.log('something');
      return;
    }
    try {
      if(searchValue === 'deck'){
        const response = await axios.get('http://localhost:3000/api/user/decks', config);
        console.log('response from decks',response);
      }else{
        const response = await axios.get(
          'http://localhost:3000/api/user/flashcards',{
            ...config,
            params: {
              id: userId,
              deckId: deckId
            }
          }
          
        );
        const cards = response?.data?.flashcards;
        if(searchInput){
          const filteredCards = cards.filter(
          (card) =>
            card.front.toLowerCase().includes(searchInput.toLowerCase()) ||
            card.back.toLowerCase().includes(searchInput.toLowerCase())
          );
          console.log({filteredCards});
          setFlashcards(filteredCards);
        }
      }
      

    } catch (error) {
      console.log(error);
    }
    console.log(searchValue);
  }

  return (
    <main>
      <Navigation />
      <form className='search-container' onSubmit={handleSubmit}>
        <h1 className='search-text'>Search</h1>
        <select name='search' onChange={(e) => setSearchValue(e.target.value)}>
          <option value='deck'>Deck</option>
          <option value='card'>Card</option>
        </select>
        <label htmlFor='searchBox'></label>
        <input id='searchBox' type='text' onChange={(e) => setSearchInput(e.target.value)}/>
        <button>Search</button>
        {flashcards.length > 0 &&
          flashcards.map((card) => <Card key={card.id} card={card} />)}
      </form>
      
    </main>
  );
}

export default Search