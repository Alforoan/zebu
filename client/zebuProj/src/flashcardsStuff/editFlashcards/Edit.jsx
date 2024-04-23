import React, { useEffect, useState } from 'react'
import './Edit.css'
import Navigation from '../../navigation/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

  const [flashcard, setFlashcard] = useState(null);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  const handleFrontChange = (e) => {
    setFrontText(e.target.value);
  }

  const handleBackChange = (e) => {
    setBackText(e.target.value);
  };

  const {id} = useParams();
  useEffect(() => {
    const fetchFlashcard = async ()=> {
      try {
          const response = await axios.get(
            'http://localhost:3000/api/user/edit',
            {
              ...config,
              params: {
                id: id,
              },
            }
          );
          setFlashcard(response?.data?.flashcard);
          const flashcard = response?.data?.flashcard;
          setFrontText(flashcard.front);
          setBackText(flashcard.back);
          console.log('response inside edit comp',response);
        } catch (error) {
          console.log(error);
        }
    }
    fetchFlashcard();
  }, [])
  

  const handleUpdate = async() => {
    try {
      const data = {front: frontText, back: backText, id:id}
      const response = await axios.put('http://localhost:3000/api/user/edit', JSON.stringify(data), config);
      console.log({response});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navigation />
      <main className='edit-container'>
        <div>
          <label htmlFor='front'>Front</label>
          <input
            type='text'
            id='front'
            value={frontText}
            onChange={handleFrontChange}
          />
        </div>
        <div>
          <label htmlFor='front'>Back</label>
          <input
            type='text'
            id='back'
            value={backText}
            onChange={handleBackChange}
          />
        </div>
        <button onClick={handleUpdate}>Update</button>
      </main>
    </>
  );
}

export default Edit