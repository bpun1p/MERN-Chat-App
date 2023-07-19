import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Access from './components/access/Access'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/access' element={<Access/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
