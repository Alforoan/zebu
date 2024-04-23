import react from 'react'
import Signup from './signup/Signup'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Decks from './deckstuff/deckpage/DeckPage'
import Login from './login/Login'
import { useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Add from './add/Add'
import Modal from 'react-modal'
import DeckPage from './deckstuff/deckpage/DeckPage'
import Flashcards from './flashcardsStuff/flashcards/Flashcards'
import Edit from './flashcardsStuff/editFlashcards/Edit'
import Search from './search/Search'


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
              <DeckPage />
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
        <Route
          path={`/flashcards/:id`}
          element={
            <ProtectedRoute path='/flashcards'>
              <Flashcards />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/edit/:id`}
          element={
            <ProtectedRoute path='/edit'>
              <Edit />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/search`}
          element={
            <ProtectedRoute path='/search'>
              <Search/>
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
