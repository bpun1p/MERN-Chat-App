import { apiSlice } from "./apiSlice"
const CHATS_URL = 'https://bpun1p-chat-app-api.onrender.com';

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