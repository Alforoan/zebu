import React, { useContext, useEffect, useState } from 'react'
import './Navigation.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import IsLoggedInContext from '../context/IsLoggedInProvider'
import Decks from '../deckstuff/deckpage/DeckPage'
import axios from 'axios'


const Navigation = ({success, setSuccess, deckId, deckName}) => {
  const navigate = useNavigate();
  const { isLoggedIn,setIsLoggedIn } = useContext(IsLoggedInContext);
  const { permDeckId, setPermDeckId } = useContext(IsLoggedInContext);
  const [urlEndpoint, setUrlEndpoint] = useState('');
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  useEffect(() => {
    if(permDeckId){
      setUrlEndpoint(`/add/${permDeckId}`);
    }else{
      setUrlEndpoint('/add/1');
    }
  }, [permDeckId, deckName])

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
            <Link className='link' to={urlEndpoint}>
              Add
            </Link>
            <Link className='link' to={`/search`}>
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