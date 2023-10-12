import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterInput } from "../../models/messageTypes";
import { setJwtToken, setRefreshToken } from "../slices/jwtSlice";
import { messageApi } from "./messageApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/auth/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<string, RegisterInput>({
      query(data) {
        return {
          url: "addNewUser",
          method: "POST",
          body: { password: data.password, name: data.name },
          responseHandler: "text",
        };
      },
    }),
   

    loginUser: builder.mutation<string, RegisterInput>({
      query(data) {
        return {
          url: "generateToken",
          method: "POST",
          body: { password: data.password, name: data.name },
          responseHandler: "text",
        };
      },
     
      async onQueryStarted(
        arg,
        { getState, dispatch, queryFulfilled, getCacheEntry, extra }
      ) {
        try {
          await queryFulfilled;
          let result = getCacheEntry().data;
          if (typeof result === "string") {
            let parsed = JSON.parse(result);
            dispatch(messageApi.util.invalidateTags(["message"]));
            dispatch(setJwtToken(parsed.accessToken));
            dispatch(setRefreshToken(parsed.refreshToken));
          }
        } catch {}
      },
    }),
  }),
});
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
