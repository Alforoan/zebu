import react from 'react'
import Signup from './signup/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './navigation/Navigation'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />} />
        <Route path='/signup' element={<Signup/>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
