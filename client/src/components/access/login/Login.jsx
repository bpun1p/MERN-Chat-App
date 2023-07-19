import React  from 'react'

export default function Login() {

  return (
    <div className='login-container'>
      <div className='login-body'>
        <h1 className='login-header'>Login</h1>
        <form className='login-form'>
          <input
            placeholder='Enter your email'
            type='text'
            id='email'
          />
          <input
            placeholder='Enter your password'
            type='password'
            id='password'
          />
          <button type='submit' className='login-btn'>Login</button>
        </form>
      </div>
    </div>
  )
}