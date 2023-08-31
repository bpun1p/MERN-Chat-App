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
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/auth/logout`,
        method: 'POST',
        credentials: 'include'
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/update`,
        method: 'PATCH',
        body: data,
        credentials: 'include'
      })
    })  
  })
})

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation, useLogoutMutation } = usersApiSlice