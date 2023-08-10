import { useState } from 'react'
// import redux
import { loginUser } from '../service/AuthService'

export const Login = () => {
  const [loginError, setLoginError] = useState(null)
  const [loadingLogin, setLoadingLogin] = useState(null)
  // dispatch to store

  const login = async (email, password) => {
    setLoadingLogin(true)
    setLoginError(false)
    const response = await loginUser(email, password)

    if (response.status !== 200) {
      let error = response.response.data.error
      setLoadingLogin(loadingLogin => !loadingLogin)
      setLoginError(() => error)
      return
    }
    
    const data = response.data
    localStorage.setItem('user', JSON.stringify(data))
    // set dispatch settings for the store
    setLoadingLogin(loadingLogin => !loadingLogin)
  }

  return { login, loadingLogin, loginError }
}