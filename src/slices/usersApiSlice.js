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
    specialists: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/specialists`,
        method: "GET",
      }),
    }),
    hospitals: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/hospitals`,
        method: "GET",
      }),
    }),
    admins: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/admins`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    specialist: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/specialist?id=${userId}`,
        method: "GET",
      }),
    }),
    hospital: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/hospital?id=${userId}`,
        method: "GET",
      }),
    }),
    verifySpecialist: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/verifySpecialist?id=${userId}`,
        method: "PUT",
      }),
    }),
    activateAdmin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/activate`,
        method: "PUT",
        body:data
      }),
    }),
    activateSpecialist: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/activateSpecialist`,
        method: "PUT",
        body:data
      }),
    }),
    activateHospital: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/activateHospital`,
        method: "PUT",
        body:data
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useDashboardMutation,
  useSpecialistsMutation,
  useHospitalsMutation,
  useAdminsMutation,
  useSpecialistMutation,
  useHospitalMutation,
  useVerifySpecialistMutation,
  useActivateAdminMutation,
  useActivateSpecialistMutation,
  useActivateHospitalMutation
} = usersApiSlice;
