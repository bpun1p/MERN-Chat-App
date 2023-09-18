import { apiSlice } from "./apiSlice"
// const base_url = import.meta.env.VITE_URL
const base_url = 'https://bpun1p-chat-app-api.onrender.com'

export const usersApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${base_url}/auth/login`,
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${base_url}/auth/register`,
        headers: {
          withCredentials: true
        },
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${base_url}/auth/logout`,
        method: 'POST',
        body: data,
        credentials: 'include',
        withCredentials: true
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${base_url}/auth/update`,
        headers: {
          Authorization: `Bearer ${data.user.token}`,
          withCredentials: true
        },
        method: 'PATCH',
        body: data,
        credentials: 'include'
      })
    })  
  })
})

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation, useLogoutMutation } = usersApiSlice