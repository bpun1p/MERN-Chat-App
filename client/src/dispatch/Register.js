import { useState } from 'react'
// import redux
import { registerUser } from '../service/authService'

export const Registration = () => {
  const [registrationError, setRegistrationError] = useState(null);
  const [loadingRegistration, setLoadingRegistration] = useState(null);
  //dispatch to store

  const registration = async (email, password) => {
    setLoadingRegistration(true)
    setRegistrationError(null)
    const response = await registerUser(email, password)

    if (response.status !== 200) {
      let error = response.response.data.error
      setLoadingRegistration(loadingRegistration => !loadingRegistration)
      setRegistrationError(() => error)
      return;
    }

    const data = response.data
    localStorage.setItem('user', JSON.stringify(data))
    //set dispatch settings to store
    setLoadingRegistration(loadingRegistration => !loadingRegistration)
  };

  return { registration, loadingRegistration, registrationError }
};