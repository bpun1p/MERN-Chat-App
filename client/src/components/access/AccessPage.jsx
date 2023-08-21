import Register from './register/Register'
import Login from './login/Login'
import './AccessPage.css'
import { useSelector } from 'react-redux'

export default function Access() {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      {!user ? 
        <>
          <div className='access-container'>
            <div className='access-body'>
              <Login/>
              <Register/>
            </div>
          </div>
        </>
      : null}
    </>
  )
}