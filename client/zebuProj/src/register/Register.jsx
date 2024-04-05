import React from 'react'
import './Register.css'
import Navigation from '../navigation/Navigation';

const Register = () => {

  window.onload = function () {
    document.getElementById('email').focus();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navigation />
      <form className='register-container' onSubmit={handleSubmit}>
        <div className='input-container'>
          <input className='form-control'  id='email' type='text'/>
          <label htmlFor="email">Email</label>
        </div>
        <div className='input-container'>
          <input className='form-control' id='password' type='text' />
          <label htmlFor='password'>Password</label>
        </div>
        <button type='submit'>Register</button>
      </form>
    </>
  );
}

export default Register