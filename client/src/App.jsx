import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Access from './components/access/AccessPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/access' element={<Access/>}/>
      </Routes>
    </BrowserRouter>
  )
}
