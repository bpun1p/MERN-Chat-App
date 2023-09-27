import { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../../slices/authApiSlice'
import { setCredentials } from '../../../slices/authSlice'
import { toast } from 'react-toastify'

export default function Register() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  
  const [ register, { isLoading } ] = useRegisterMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCreateClicked = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields must be filled!')
      return
    }
    else if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    try {
      const res = await register({ name, email, password }).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/chats')
    } catch(err) {
      if (err.data && err.data.error) {
        toast.error(err.data.error)
      }
    }
    return
  }

  return (
    <div className='register-container'>
      <div className='register-body'>
        <h1 className='register-header'>Register</h1>
        <form className='register-form'>
          <input
            placeholder='Enter name'
            type='text'
            id='register-name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder='Enter email'
            type='text'
            id='register-email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Create password'
            type='password'
            id='register-password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder='Confirm password'
            type='password'
            id='register-confirm-password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type='submit' className='register-btn' disabled={isLoading} onClick={handleCreateClicked}>Create</button>
        </form>
      </div>
    </div>
  )
}