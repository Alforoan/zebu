import React from 'react'
import './Signup.css'
import Navigation from '../navigation/Navigation';
import { BASE_URL } from '../constants';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const Signup = () => {
 
  return (
    <Form route='/api/user/signup' method='signup'/>
  );
}

export default Signup