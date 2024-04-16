import react from 'react'
import Signup from './signup/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Decks from './decks/Decks'
import Login from './login/Login'
import { useState } from 'react'


function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          //element={isLoggedIn ? <Decks /> : <Navigate to='/login' />}
          element={<Navigate to='/login' />}
        />
        <Route
          path='/decks'
          // element={isLoggedIn ? <Decks /> : <Navigate to='/login' />}
          element={<Decks />}
        />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/login'
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
