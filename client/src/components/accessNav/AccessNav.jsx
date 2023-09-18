import './AccessNav.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCredentials } from '../../slices/authSlice'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { useNavigate } from 'react-router-dom'


export default function AccessNav() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout, { isLoading }] = useLogoutMutation()

  const handleLogoutClicked = async () => {
    await logout()
    dispatch(clearCredentials())
    navigate('/access')
  }

  return (
    <div className='accessNav-container'>
      <nav className='accessNav-body'>
        <Link to='/access'>
        {!user ?
          <button type='button' className='accessNav-login-register'>Login / Register</button>
          :
          <button type='button' className='accessNav-login-register' onClick={handleLogoutClicked}>Logout</button>
        }
        </Link>
      </nav>
    </div>
  )
}