import React from 'react';
import './Login.css';
import Navigation from '../navigation/Navigation';
import { BASE_URL } from '../constants';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const Login = ({setIsLoggedIn}) => {
 
  return <Form route='/api/user/login' method='login' setIsLoggedIn={setIsLoggedIn}/>;
};

export default Login;
