import { apiSlice } from "./apiSlice"
const base_url = import.meta.env.VITE_URL
// const base_url = 'https://bpun1p-chat-app-api.onrender.com'

export const usersApiSlice = apiSlice.injectEndpoints({         //creates the endpoint and then inject into the store/builder
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: (data) => ({
        url: `${base_url}/users/getAllUsers`,
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

export const { useGetAllUsersMutation } = usersApiSlice