import { apiSlice } from "./apiSlice"
const USERS_URL = 'http://localhost:3000';

export const usersApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/login`,
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/register`,
        headers: {
          withCredentials: true
        },
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/update`,
        headers: {
          Authorization: `Bearer ${data.token}`,
          withCredentials: true
        },
        method: 'PATCH',
        body: data,
        credentials: 'include'
      })
    })  
  })
})

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice