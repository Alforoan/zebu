import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='navigation-container'>
      <h2>Zebu</h2>

      <Link to='/signup'>
        <button>Sign Up</button>
      </Link>
    
    </div>
  )
}

export default Navigation