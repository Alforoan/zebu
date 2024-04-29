import React, { useContext, useEffect } from 'react'
import IsLoggedInContext from '../context/IsLoggedInProvider'
import { useNavigate,Navigate, Route, useParams } from 'react-router-dom';
import axios from 'axios';


const ProtectedRoute = ({children, path}) => {
  const navigate = useNavigate();
  const {id} = useParams();

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
        const data = response.data.message;

        if (data === 'success') {
          setIsLoggedIn(true);
          if(id){
            console.log(`id defined...${path}/${id}`);
            //navigate(`${path}/${id}`);
          }else{
            //console.log(`id not defined...${path}`);
            navigate(`${path}`);
          }
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
  }, [id]);


  return (
    <>
      {isLoggedIn ? children : null}
    </>
  );
}

export default ProtectedRoute