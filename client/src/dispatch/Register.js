import { useState } from 'react';
// import redux
import { registerUser } from '../service/authService';

export const Registration = () => {
  const [registrationError, setRegistrationError] = useState(null);
  const [loadingRegistration, setLoadingRegistration] = useState(null);
  //dispatch to store

  const registration = async (email, password) => {
    setLoadingRegistration(true)
    setRegistrationError(false)
    const response = await registerUser(email, password)

    if (response.status !== 200) {
      setLoadingRegistration(loadingRegistration => !loadingRegistration)
      setRegistrationError((registrationError) => !registrationError)
      return;
    }

    const data = response.data
    localStorage.setItem('user', JSON.stringify(data))
    //set dispatch settings to store
    setLoadingRegistration(false)
  };

  return { registration, loadingRegistration, registrationError }
};