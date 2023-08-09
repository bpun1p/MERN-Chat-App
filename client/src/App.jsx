import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Access from './components/access/AccessPage'
import AccessNav from './components/accessNav/AccessNav';

export default function App() {
  return (
    <BrowserRouter>
      <AccessNav/>
      <Routes>
        <Route path='/access' element={<Access/>}/>
      </Routes>
    </BrowserRouter>
  )
}
