import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/admins";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        
      }),
    }),
    dashboard: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/dashboard`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useDashboardMutation } =
  usersApiSlice;