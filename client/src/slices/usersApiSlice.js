import { apiSlice } from "./apiSlice";
const base_url = import.meta.env.VITE_URL;

export const usersApiSlice = apiSlice.injectEndpoints({
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
});

export const { useGetAllUsersMutation } = usersApiSlice;
