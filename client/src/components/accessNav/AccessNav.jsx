// import { usestate } from 'react'
import './AccessNav.css'
import { Link } from 'react-router-dom';

export default function accessNav() {

  return (
    <div className='accessNav-container'>
      <nav className='accessNav-body'>
        <Link to='/access'>
        {/* {!isUser ? */}
          <button type='button' className='accessNav-login-register'>Login / Register</button>
          {/* : */}
          {/* <button type='button' className='accessNav-login-register'>Logout</button> */}
        {/* } */}
        </Link>
      </nav>
    </div>
  )
}