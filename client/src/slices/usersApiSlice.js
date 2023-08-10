import { apiSlice } from "./apiSlice"
const USERS_URL = 'api/users';

export const usersApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      })
    })
  })
})

export const { useLoginMutation } = usersApiSlice