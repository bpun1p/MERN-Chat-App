import { apiSlice } from "./apiSlice"
const base_url = import.meta.env.VITE_URL
// const base_url = 'https://bpun1p-chat-app-api.onrender.com'

export const chatsApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    fetchMessages: builder.mutation({
      query: (data) => ({
        url: `${base_url}/messages/${data.selectedUserId}`,
        headers: {
          Authorization: `Bearer ${data.user.token}`,
          withCredentials: true
        },
        method: 'GET',
        credentials: 'include'
      })
    })
  })
})

export const { useFetchMessagesMutation } = chatsApiSlice