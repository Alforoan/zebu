import React, { useContext } from 'react'
import './Navigation.css'
import { Link, useNavigate } from 'react-router-dom'
import IsLoggedInContext from '../context/IsLoggedInProvider'
import Decks from '../deckstuff/deckpage/DeckPage'
import axios from 'axios'


const Navigation = ({success, setSuccess}) => {
  const navigate = useNavigate();
  const { isLoggedIn,setIsLoggedIn } = useContext(IsLoggedInContext);
  
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  const handleLogout = async () => {
    console.log("somethign here");
    try {
      const response = await axios.get(
        'http://localhost:3000/api/user/logout',
        config
      );
      setIsLoggedIn(false);
      navigate('/login');
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='navigation-container'>
      {!isLoggedIn ? (
        <React.Fragment>
          <h2>Zebu</h2>
          <Link to='/signup'>
            <button>Sign Up</button>
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='navbar'>
            <h2>Zebu</h2>
            <Link className='link' to='/decks'>
              Decks
            </Link>
            <Link className='link' to='/add'>
              Add
            </Link>
            <Link className='link' to='/search'>
              Search
            </Link>
          </div>
          <Link to=''>
            <button onClick={handleLogout}>Log Out</button>
          </Link>
        </React.Fragment>
      )}
    </div>
  );
}

export default Navigation