import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: ''})

export const apiSlice =  createApi({
  baseQuery,
  tagTypes: ['User'],                       //cacheing to avoid constant fetching 
  endpoints: (builder) => ({})
})