import React, { useEffect, useState, useRef } from 'react';
import './Form.css';
import Navigation from '../navigation/Navigation';
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from '../constants';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Form = ({route, method}) => {

  const userRef = useRef();
  const errRef = useRef();

  const [success, setSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [isSignupPage, setIsSignupPage] = useState(false);

  const navigate = useNavigate();

  const name = method === 'login' ? 'Log In' : 'Sign Up';
  const linkTo = method === 'login' ? 'Signup' : 'Login';

  useEffect(() => {
    if(method === 'signup'){
      setIsSignupPage(true);
    }else{
      setIsSignupPage(false);
    }
  }, [method])

  window.onload = function () {
    document.getElementById('email').focus();
  };

  const handleChangeEmail = (e) => {
    const emailLabel = document.getElementById('email-label');
    if (e.target.value) {
      emailLabel.classList.add('has-value');
    } else {
      emailLabel.classList.remove('has-value');
    }
  };

  const handleChangePassword = (e) => {
    const passwordLabel = document.getElementById('password-label');
    if (e.target.value) {
      passwordLabel.classList.add('has-value');
    } else {
      passwordLabel.classList.remove('has-value');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    let password = e.target[1].value;
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
    let response;
    try {
      password = method === 'login' ? password : await bcrypt.hash(password, 10);
      
      const url = BASE_URL + route;
      console.log({url});
      response = await api.post(url, {email, password})

      console.log("FIND THE RESPONSE NOW", response );
      if(method === 'login'){
        setSuccess(true);
        setShowSuccessMessage('Successfully registered!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
        navigate('/');
        return;
      }else{
        navigate('/login');
      }
    } catch (error) {
        console.log(error);
        setSuccess(false);
        setShowErrorMessage(response?.error);
        throw new Error('Failed to create user');
    }
  };

  return (
    <>
      <section>
        <Navigation />
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              className='form-control'
              id='email'
              type='text'
              onChange={handleChangeEmail}
            />
            <label htmlFor='email' id='email-label'>
              Email
            </label>
          </div>
          <div className='input-container'>
            <input
              className='form-control'
              id='password'
              type='password'
              onChange={handleChangePassword}
            />
            <label htmlFor='password' id='password-label'>
              Password
            </label>
          </div>
          {!success ? (
            <div className='error-msg'> {showErrorMessage}</div>
          ) : (
            <div className='success-msg'>{showSuccessMessage}</div>
          )}
          <div style={{ display: 'flex' }}>
            <button className='btn' type='submit'>
              {name}
            </button>
          </div>
        </form>
        <div className='signin-login-container'>
          {isSignupPage ? (
            <div className='btn2-container'>
              <p>Already have an account?</p>
              <button type='button' className='btn2'>
                <Link
                  style={{ color: '#007BFF' }}
                  to={`/${linkTo.toLowerCase()}`}
                >
                  Log In
                </Link>
              </button>
            </div>
          ) : (
            <div className='btn2-container'>
              <p>Don't have an account yet?</p>
              <button type='button' className='btn2'>
                <Link
                  style={{ color: '#007BFF' }}
                  to={`/${linkTo.toLowerCase()}`}
                >
                  Sign Up
                </Link>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Form;
