import axios from 'axios'
const currentUrl = 'http://localhost:3000'

export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(`${currentUrl}/access/register`, {
      email: email,
      password: password
    })
    return res
  }
  catch(err) {
    return err;
  }
}

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${currentUrl}/access/login`, {
      email: email,
      password: password
    })
    return res
  }
  catch(err) {
    return err;
  }
}