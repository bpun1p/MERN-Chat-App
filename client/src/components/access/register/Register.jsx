import React  from 'react'
import './Register.css'

export default function Register() {

  return (
    <div className='register-container'>
      <div className='register-body'>
        <h1 className='register-header'>Register</h1>
        <form className='register-form'>
          <input
            placeholder='Email'
            type='text'
            id='register-email'
          />
          <input
            placeholder='Create a password'
            type='password'
            id='register-password'
          />
          <input
            placeholder='Confirm your password'
            type='password'
            id='register-confirm-password'
          />
          <button type='submit' className='register-btn'>Create</button>
        </form>
      </div>
    </div>
  )
}