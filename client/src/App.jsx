import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Access from './components/access/AccessPage'
import AccessNav from './components/accessNav/AccessNav';
import MenuToggler from './components/menu/MenuToggler'

export default function App() {
  return (
    <BrowserRouter>
      <AccessNav/>
      <MenuToggler/>
      <Routes>
        <Route path='/access' element={<Access/>}/>
      </Routes>
    </BrowserRouter>
  )
}
