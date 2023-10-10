import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import {
  AuthError,
  AuthResponse,
  Message,
  MessagesWrapper,
  User,
} from "../../models/messageTypes";
import { setJwtToken, setRefreshToken } from "../slices/jwtSlice";
import { RootState } from "../store";

const baseQueryWithReauth:
  | BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
  | AuthResponse = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery1(args, api, extraOptions);
  let error = result.error?.data as { error_message: string };

  console.log(error);
  if (
    result.error &&
    result.error.status === 401 &&
    error.error_message.startsWith("JWT expired")
  ) {
    const refreshToken = (api.getState() as RootState).jwt.refreshToken;

    const refreshResult = await baseQuery1(
      {
        method: "POST",
        url: "/auth/refreshToken",
        body: { refreshToken: refreshToken },
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );
    let resultData = refreshResult.data as AuthResponse;

    if (resultData) {
      api.dispatch(setJwtToken(resultData.accessToken));
      api.dispatch(setRefreshToken(resultData.refreshToken));

      result = await baseQuery1(args, api, extraOptions);
    } else {
    
      console.log("ERRRORR");
    }
  }
  return result;
};

const baseQuery1 = fetchBaseQuery({
  baseUrl: `http://localhost:8080/`,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).jwt.jwtToken;

    if (token && endpoint != "refresh") {
      headers.set("Authorization", token);
    }

    return headers;
  },
});

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["message"],
  endpoints: (build) => ({
    getMessages: build.query<MessagesWrapper, number>({
      query: (page) => ({
        url: "messages",
        params: { page },
      }),

      providesTags: ["message"],
    }),

    createOne: build.mutation<Message, string>({
      query: (message) => ({
        url: "messagePost",
        method: "POST",
        body: { text: message },
      }),
      invalidatesTags: ["message"],
    }),
    deleteMessage: build.mutation<Message, number>({
      query: (id) => ({
        url: `deleteMessage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
    logoutUser: build.mutation<void, void>({
      query() {
        return {
          method: "POST",
          url: "auth/logout",
        };
      },
    }),
    setLike: build.mutation<void, number>({
      query: (messageId) => ({
        url: "/setLike",
        method: "POST",
        params: { messageId },
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useLogoutUserMutation,
  useGetMessagesQuery,
  useCreateOneMutation,
  useDeleteMessageMutation,
  useSetLikeMutation,
} = messageApi;
