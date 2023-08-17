import { useState } from 'react'
import './Register.css'

export default function Register() {

  const [registerCreds, setRegisterCreds] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    console.log(registerCreds)
  }

  return (
    <div className='register-container'>
      <div className='register-body'>
        <h1 className='register-header'>Register</h1>
        <form className='register-form'>
          <input
            placeholder='Name'
            type='text'
            id='register-name'
            onChange={(e) => setRegisterCreds({...registerCreds, name: e.target.value})}
          />
          <input
            placeholder='Email'
            type='text'
            id='register-email'
            onChange={(e) => setRegisterCreds({...registerCreds, email: e.target.value})}
          />
          <input
            placeholder='Create a password'
            type='password'
            id='register-password'
            onChange={(e) => setRegisterCreds({...registerCreds, password: e.target.value})}
          />
          <input
            placeholder='Confirm your password'
            type='password'
            id='register-confirm-password'
            onChange={(e) => setRegisterCreds({...registerCreds, confirmPassword: e.target.value})}
          />
          <button type='submit' className='register-btn' onClick={handleFormSubmit}>Create</button>
        </form>
      </div>
    </div>
  )
}