import React, { useEffect } from 'react'
import Navigation from '../navigation/Navigation'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Decks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/user/decks',
          config
        );
        
        const data = response.data.message;
        console.log('DATA FROM DECKS', data);
        if (data === 'success') {
          navigate('/decks');
        }else{
          console.log("cant access");
          navigate('/login');
        }
      } catch (error) { 
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navigation/>
      <h1>Decks</h1>
    </div>
  )
}

export default Decks