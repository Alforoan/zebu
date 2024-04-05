import react from 'react'
import Register from './register/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './navigation/Navigation'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />} />
        <Route path='/register' element={<Register/>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
