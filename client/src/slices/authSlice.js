import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    clearCredentials: (state, action) =>  {
      state.user = null;
      localStorage.removeItem('user')
    }
  }
})

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer