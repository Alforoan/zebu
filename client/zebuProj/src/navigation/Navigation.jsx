import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

const Navigation = ({success, setSuccess}) => {
  return (
    <div className='navigation-container'>
      <h2>Zebu</h2>

      <Link to='/signup'>
        <button>Sign Up</button>
      </Link>
      {
        success ? <Link to='/signin'>
        <button>Log out</button>
      </Link> : ''
      }
      
    </div>
  )
}

export default Navigation