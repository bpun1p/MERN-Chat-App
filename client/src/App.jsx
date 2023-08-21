import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Access from './components/access/AccessPage'
import AccessNav from './components/accessNav/AccessNav'
import MenuToggler from './components/menu/MenuToggler'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChatsScreen from './components/chats/ChatsScreen'
import PrivateRoute from './components/utils/privateRoutes/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <AccessNav/>
      <MenuToggler/>
      <Routes>
        <Route path='/access' element={<Access/>}/>
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/chats' element={<ChatsScreen/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
