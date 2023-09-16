import { apiSlice } from "./apiSlice"
const base_url = import.meta.env.VITE_URL

export const chatsApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    fetchMessages: builder.mutation({
      query: (data) => ({
        url: `${base_url}/messages/${data.selectedUserId}`,
        method: 'GET',
        credentials: 'include'
      })
    })
  })
})

export const { useFetchMessagesMutation } = chatsApiSlice