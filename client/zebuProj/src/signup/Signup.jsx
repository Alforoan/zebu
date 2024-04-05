import React from 'react'
import './Signup.css'
import Navigation from '../navigation/Navigation';

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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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