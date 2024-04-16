import React, { useContext, useEffect } from 'react'
import IsLoggedInContext from '../context/IsLoggedInProvider'
import { useNavigate,Navigate, Route } from 'react-router-dom';
import axios from 'axios';


const ProtectedRoute = ({children, path}) => {
  const navigate = useNavigate();
  console.log('CHECKING PATH YES', path);
  const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);
  useEffect(() => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/decks`,
          config
        );
        console.log("GETTING RESPONSE",response);
        const data = response.data.message;
        console.log('DATA FROM DECKS', data);
        if (data === 'success') {
          setIsLoggedIn(true);
          navigate(`${path}`);
        } else {
          console.log('cant access');
          setIsLoggedIn(false);
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      {isLoggedIn ? children : <Navigate to='/login'/>}
    </>
  );
}

export default ProtectedRoute