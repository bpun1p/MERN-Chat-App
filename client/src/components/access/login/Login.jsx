import { useState } from 'react'
import './Login.css'

export default function Login() {
  const [loginCreds, setIsLoginCreds] = useState({
    email: null,
    password: null,
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    console.log(loginCreds)
  }

  return (
    <div className='login-container'>
      <div className='login-body'>
        <h1 className='login-header'>Login</h1>
        <form className='login-form'>
          <input
            placeholder='Enter your email'
            type='text'
            id='login-email'
            onChange={(e) => setIsLoginCreds({...loginCreds, email: e.target.value})}
          />
          <input
            placeholder='Enter your password'
            type='password'
            id='login-password'
            onChange={(e) => setIsLoginCreds({...loginCreds, password: e.target.value})}
          />
          <button type='submit' className='login-btn' onClick={handleFormSubmit}>Login</button>
        </form>
      </div>
    </div>
  )
}