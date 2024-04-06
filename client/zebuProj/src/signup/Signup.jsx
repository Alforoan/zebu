import React from 'react'
import './Signup.css'
import Navigation from '../navigation/Navigation';
import { BASE_URL } from '../constants';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const navigate = useNavigate();

  window.onload = function () {
    document.getElementById('email').focus();
  };

  const handleChangeEmail = (e) => {
    const emailLabel = document.getElementById('email-label');
    if(e.target.value){
      emailLabel.classList.add('has-value');
    }else{
      emailLabel.classList.remove('has-value');
    }
  }

  const handleChangePassword = (e) => {
    const passwordLabel = document.getElementById('password-label');
    if (e.target.value) {
      passwordLabel.classList.add('has-value');
    }else{
      passwordLabel.classList.remove('has-value');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email || !password) {
      switch (true) {
        case !email && !password:
          setSuccess(false);
          setShowErrorMessage('Please provide your email and password!');
          break;
        case !email:
          setSuccess(false);
          setShowErrorMessage('Please provide your email!');
          break;
        case !password:
          setSuccess(false);
          setShowErrorMessage('Please provide your password!');
          break;
        default:
          break;
      }
      return;
    }

    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await fetch(`${BASE_URL}/api/user/signup`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password:hashedPassword})
      });
      console.log({response});
      if(!response.ok){
         const data = await response.json();
         setSuccess(false);
         setShowErrorMessage(data.error || 'Error');
         throw new Error('Failed to create user');
      }else{
        setSuccess(true);
        setShowSuccessMessage('Successfully registered!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navigation />
      <form className='signup-container' onSubmit={handleSubmit}>
        <div className='input-container'>
          <input className='form-control'  id='email' type='text' onChange={handleChangeEmail}/>
          <label htmlFor="email" id='email-label'>Email</label>
        </div>
        <div className='input-container'>
          <input className='form-control' id='password' type='password' onChange={handleChangePassword}/>
          <label htmlFor='password' id='password-label'>Password</label>
        </div>
        {!success ?<div className='error-msg'> {showErrorMessage}</div> : <div className='success-msg'>{showSuccessMessage}</div>}
        <div style={{display:'flex'}}>
          <button type='submit' style={{marginRight:'1rem'}}>Signup</button>
          <button type='button'><Link to='/login'>Login</Link></button>
        </div>
      </form>
    </>
  );
}

export default Signup