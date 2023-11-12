import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({baseUrl:"http://localhost:5000",credentials: "include",})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder)=>({})
})