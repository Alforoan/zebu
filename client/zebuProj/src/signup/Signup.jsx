import React from 'react'
import './Signup.css'
import Navigation from '../navigation/Navigation';

const Signup = () => {

  window.onload = function () {
    document.getElementById('email').focus();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navigation />
      <form className='signup-container' onSubmit={handleSubmit}>
        <div className='input-container'>
          <input className='form-control'  id='email' type='text'/>
          <label htmlFor="email">Email</label>
        </div>
        <div className='input-container'>
          <input className='form-control' id='password' type='text' />
          <label htmlFor='password'>Password</label>
        </div>
        <button type='submit'>Signup</button>
      </form>
    </>
  );
}

export default Signup