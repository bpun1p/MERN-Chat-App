import { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../../slices/authApiSlice'
import { setCredentials } from '../../../slices/authSlice'
import { toast } from 'react-toastify'
import infoIcon from '../../../assets/images/information.png'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export default function Register() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const passReqTooltip = (
    <>
      <span>Password must use a combination of these:</span>
      <ul className='pass-req-list'>
        <li>Must be atleast 8 characters long.</li>
        <li>Must contain a lowercase letter</li>
        <li>Must contain a uppercase letter</li>
        <li>Must contain a number or special character</li>
      </ul>
    </>
  )
  
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
          <div className='password-container'>
            <input
              placeholder='Create password'
              type='password'
              id='register-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Tooltip placement='top' overlay={passReqTooltip}>
              <img src={infoIcon} id='infoIcon'/>
            </Tooltip>
          </div>
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