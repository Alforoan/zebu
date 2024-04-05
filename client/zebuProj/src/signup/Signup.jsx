import React from 'react'
import './Signup.css'
import Navigation from '../navigation/Navigation';
import { BASE_URL } from '../constants';

const Signup = () => {

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

    try {
      const response = await fetch(`${BASE_URL}/api/user/signup`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      console.log({response});
      if(!response.ok){
        throw new Error('Failed to create user');
      }else{
        //show a success message from react modal
      }
    } catch (error) {
      console.log(error);
    }

    console.log({email});
    console.log({password});
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
          <input className='form-control' id='password' type='text' onChange={handleChangePassword}/>
          <label htmlFor='password' id='password-label'>Password</label>
        </div>
        <button type='submit'>Signup</button>
      </form>
    </>
  );
}

export default Signup