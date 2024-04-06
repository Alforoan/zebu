import react from 'react'
import Signup from './signup/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import Signin from './signin/Signin'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
