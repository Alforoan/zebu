import React, { useEffect, useState, useRef } from 'react';
import './Form.css';
import Navigation from '../navigation/Navigation';
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from '../constants';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import axios from 'axios';

const Form = ({route, method}) => {

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignupPage, setIsSignupPage] = useState(false);

  const navigate = useNavigate();

  const name = method === 'login' ? 'Log In' : 'Sign Up';
  const linkTo = method === 'login' ? 'Signup' : 'Login';

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;



  useEffect(() => {
    if(method === 'signup'){
      setIsSignupPage(true);
    }else{
      setIsSignupPage(false);
    }
  }, [method])

  useEffect(() => {
    emailRef?.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password.length > 0 && password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword])

  useEffect(() => {
    setErrorMessage('');
  }, [email, password, matchPassword])

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailLabel = document.getElementById('email-label');
    if (e.target.value) {
      emailLabel.classList.add('has-value');
    } else {
      emailLabel.classList.remove('has-value');
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    const passwordLabel = document.getElementById('password-label');
    if (e.target.value) {
      passwordLabel.classList.add('has-value');
    } else {
      passwordLabel.classList.remove('has-value');
    }
  };

  const handleConfirmPassword = (e) => {
    setMatchPassword(e.target.value);
    const confirmPasswordLabel = document.getElementById(
      'confirm-password-label'
    );
    if (e.target.value) {
      confirmPasswordLabel.classList.add('has-value');
    } else {
      confirmPasswordLabel.classList.remove('has-value');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = PASSWORD_REGEX.test(password);

    if(!validEmail || !validPassword){
      setErrorMessage('Invalid Entry');
      return;
    }

    let curEmail = e.target[0].value;
    let curPassword = e.target[1].value;
    
    let response;
    const url = BASE_URL + route;
    try {
      curPassword =
        method === 'login' ? curPassword : await bcrypt.hash(curPassword, 10);
      response = await axios.post(url, JSON.stringify({email:curEmail, password: curPassword}), 
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });
      let msg = response?.data?.message;
      if(msg.toLowerCase().includes('sign-up')){
        setSuccess(true);
        setSuccessMessage(msg);
        setEmail('');
        setPassword('');
        setMatchPassword('');
        setTimeout(() => {
          navigate('/login')
        }, 1500);
      }else {
        setSuccess(true);
        setSuccessMessage(msg);
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }
      
      console.log("response thing",response);
    } catch (error) {
        setSuccess(false);
        setErrorMessage(error?.response?.data?.error);
        errRef.current.focus();
    }
    // try {
    //   curPassword = method === 'login' ? curPassword : await bcrypt.hash(curPassword, 10);
      
    //   const url = BASE_URL + route;
  
    //   response = await api.post(url, {email: curEmail, password: curPassword})
    //   if(response?.error){
    //     setErrorMessage(response.error);
    //     return;
    //   }
  
    //   if(method === 'login'){
    //     setSuccess(true);
    //     console.log("success boolean",success);
    //     setSuccessMessage('Welcome!');
    //     setTimeout(() => {
    //       navigate('/');
    //     }, 2000);
     
    //     return;
    //   }else{
    //     setSuccess(true);
    //     setSuccessMessage('Successfully registered!');
    //     setTimeout(() => {
    //       navigate('/login');
    //     }, (1500));
        
    //   }
    // } catch (error) {
    //   console.log("LOGGING THE ERRRO", error);
    //     console.log("ERROR IS HAPPENING");
    //     console.log("response inside error",response);
    //     setSuccess(false);
    //     setErrorMessage(response?.error);
    //     throw new Error('Failed to create user');
    // }
  };

  return (
    <>
      <section>
        <Navigation />
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              ref={emailRef}
              autoComplete='off'
              className='form-control'
              id='email'
              type='text'
              onChange={handleChangeEmail}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
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
              required
              aria-invalid={validPassword ? 'false' : 'true'}
              onChange={handleChangePassword}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <label htmlFor='password' id='password-label'>
              Password
            </label>
          </div>
          {method !== 'login' ? (
            <div className='input-container'>
              <input
                className='form-control'
                id='confirm-password'
                type='password'
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                onChange={handleConfirmPassword}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <label htmlFor='confirm-password' id='confirm-password-label'>
                Confirm Password
              </label>
            </div>
          ) : (
            ''
          )}

          {!success ? (
            <p ref={errRef} className='error-msg'>
              {' '}
              {errorMessage}
            </p>
          ) : (
            <p className='success-msg'>{successMessage}</p>
          )}
          {method !== 'login' ? (
            <div style={{ display: 'flex' }}>
              <button
                disabled={!(validMatch && validPassword && validEmail)}
                className='btn'
                type='submit'
              >
                {name}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <button
                disabled={!(validPassword && validEmail)}
                className='btn'
                type='submit'
              >
                {name}
              </button>
            </div>
          )}
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
