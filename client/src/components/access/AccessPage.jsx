import Register from './register/Register'
import Login from './login/Login'
import './AccessPage.css'

export default function Access() {
  return (
    <div className='access-container'>
      <div className='access-body'>
        <Login/>
        <Register/>
      </div>
    </div>
  )
}