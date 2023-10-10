import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  CommentPage,
  RegisterInput,
} from "../../models/messageTypes";
import { RootState } from "../store";

import { setJwtToken, setRefreshToken } from "../slices/jwtSlice";

const baseQueryWithReauth:
  | BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
  | AuthResponse = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery1(args, api, extraOptions);
  
  let error = result.error?.data as { error_message: string };

  console.log(error+"ERROR");
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

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["comment"],
  endpoints: (builder) => ({
    getComments: builder.query<
      CommentPage,
      { page: number; messageId: number }
    >({
      providesTags: ["comment"],
      query: ({ page, messageId }) => ({
        url: `getComments/${messageId}`,
        params: { page },
      }),
    }),
    postComment: builder.mutation<string, RegisterInput>({
      query: ({ comment, messageId }) => ({
        url: "createComment",
        method: "POST",
        body: { text: comment },
        params: { messageId },
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: "deleteComment",
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
