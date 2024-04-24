import React, { useEffect, useRef, useState } from 'react'
import './Edit.css'
import Navigation from '../../navigation/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

  const [flashcard, setFlashcard] = useState(null);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const frontRef = useRef(null);
  const style = useRef(null);
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
  
  useEffect(() => {
    frontRef.current.focus();
  }, [])

  
  useEffect(() => {
    style.current = (errMsg || successMsg) ? '-.5rem' : '1rem';
  }, [errMsg, successMsg])

  const handleUpdate = async() => {
    try {
      const data = {front: frontText, back: backText, id:id}
      const response = await axios.put('http://localhost:3000/api/user/edit', JSON.stringify(data), config);
      console.log({response});
      if (response.status === 200) {
        setSuccessMsg('Successfully updated!')
        setTimeout(() => {
          window.close(); 
        }, 1500);
        
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  }

  return (
    <>
      <Navigation />
      <main className='edit-container'>
        <div>
          <div className='front-container'>
            <p>Front</p>
            <div ref={frontRef} className='textarea' contentEditable='true'>{frontText}</div>
          </div>
        </div>
        <div>
          <div className='back-container'>
            <p>Back</p>
            <div className='textarea' contentEditable='true'>{backText}</div>
          </div>
        </div>
        {successMsg && <p className='success-msg'>{successMsg}</p>}
        {errMsg && <p className='err-msg'>{errMsg}</p>}
        <button className='update-btn' onClick={handleUpdate} style={{marginTop:`${style.current}`}}>Update</button>
      </main>
    </>
  );
}

export default Edit