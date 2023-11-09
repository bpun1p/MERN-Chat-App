import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../slices/authApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClicked = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields must be filled!');
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/chats');
    } catch (err) {
      if (err.data && err.data.error) {
        toast.error(err.data.error);
        return;
      }
    }
    return;
  }

  const handleGuestAccessClicked = async (e) => {
    e.preventDefault();
    const email = import.meta.env.VITE_GUEST_EMAIL;
    const password = import.meta.env.VITE_GUEST_PASS;

    const res = await login({ email, password }).unwrap();
    dispatch(setCredentials({ ...res }));
    navigate('/chats');
  }

  return (
    <div className='login-container'>
      <div className='login-body'>
        <h1 className='login-header'>Login</h1>
        <form className='login-form'>
          <input
            placeholder='Enter email'
            type='text'
            id='login-email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Enter password'
            type='password'
            id='login-password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={isLoading} type='submit' className='login-btn' onClick={handleLoginClicked}>Login</button>
          <span>OR</span>
          <button disabled={isLoading} type='submit' className='guest-btn' onClick={handleGuestAccessClicked}>Guest Access</button>
        </form>
      </div>
    </div>
  );
}
