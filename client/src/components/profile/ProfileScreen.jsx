import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import './ProfileScreen.css'

function ProfileScreen() {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
      setName(user.name)
      setEmail(user.email)
    }, [user.name, user.email])

    const submitUpdateHandler = async (e) => {
      e.preventDefault()
      if (!password || !confirmPassword) {
        toast.error('All fields must be filled!')
      }
      else if (password !== confirmPassword) {
        toast.error('Passwords do not match!')
      }
      try {
        //send in updates and dispatch info
      } catch(err) {
        if (err.data && err.data.error) {
          toast.error(err.data.error)
        }
      } 
    }

  return (
    <div className='update-container'>
      <h1>Update Profile</h1>
      <form className='update-form'>
        <div className='update-body'>
          <div className='update-name-container'>
            <h4>Name:</h4>
            <input
              placeholder='Enter name'
              type='text'
              id='update-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='update-email-container'>
            <h4>Email:</h4>
            <input
            placeholder='Enter email'
            type='text'
            id='update-email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='update-password-container'>
            <h4>Password:</h4>
            <input
            placeholder='Create password'
            type='password'
            id='update-password'
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='update-confirm-container'>
            <h4>Confirm Password:</h4>
            <input
            placeholder='Confirm password'
            type='password'
            id='update-confirm-password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </form>
      <br/>
      <button type='submit' className='update-btn' onClick={submitUpdateHandler}>Update</button>
    </div>
  )
}

export default ProfileScreen