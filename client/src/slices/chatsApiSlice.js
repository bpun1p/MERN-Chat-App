import { apiSlice } from "./apiSlice"
const USERS_URL = 'http://localhost:3000';

export const chatsApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    fetchMessages: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/messages/${data.selectedUserId}`,
        method: 'GET',
        credentials: 'include'
      })
    })
  })
})

export const { useFetchMessagesMutation } = chatsApiSlice