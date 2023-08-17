import { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../../slices/usersApiSlice'
import { setCredentials } from '../../../slices/authSlice'

export default function Login() {
  const [ email, setEmail ] = useState(null)
  const [ password, setPassword ] = useState(null) 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ login, { isLoading, error } ] = useLoginMutation()
  const { user } = useSelector((state) => state.auth)
  const [ isError, setIsError ] = useState(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/chats')
    } catch(err) {
      if (err.data && err.data.error) {
        console.log(err)
        setIsError(() => err.data.error)
      }
    }
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
            onChange={(e) => setEmail(() => e.target.value)}
          />
          <input
            placeholder='Enter your password'
            type='password'
            id='login-password'
            onChange={(e) => setPassword(() =>  e.target.value)}
          />
          <button disabled={isLoading} type='submit' className='login-btn' onClick={handleFormSubmit}>Login</button>
        </form>
        {isError ? <span>{isError}</span> : null}  {/* possible guards and checks required for error return */}
      </div>
    </div>
  )
}