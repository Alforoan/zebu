import React, { useContext, useEffect } from 'react'
import Navigation from '../navigation/Navigation'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IsLoggedInContext from '../context/IsLoggedInProvider';

const Decks = () => {
 
  return (
    <div>
      <Navigation/>
      <h1>Decks</h1>
    </div>
  )
}

export default Decks