import React from 'react'

const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        
        width: '40vw', 
        height: '60vh',margin:'auto',
      }}
    >
      <img src='/images/error.png' alt='Error Image' />
      <h2 style={{marginBottom:'0rem', marginTop:'2rem'}}>This page can't be found!</h2>
      <p>typeracer.com is free for some typing practice :D</p>
    </div>
  );
}

export default Error