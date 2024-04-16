import react from 'react'
import Signup from './signup/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Decks from './decks/Decks'
import Login from './login/Login'
import { useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Add from './add/Add'
import Modal from 'react-modal'


Modal.setAppElement('#root');

function App() {

  const protectedPaths = ['/decks', '/add', '/search'];

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
          element={
            <ProtectedRoute path='/decks'>
              <Decks />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add'
          element={
            <ProtectedRoute path='/add'>
              <Add />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path='/decks'
          // element={isLoggedIn ? <Decks /> : <Navigate to='/login' />}
          element={<Decks />}
        /> */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
