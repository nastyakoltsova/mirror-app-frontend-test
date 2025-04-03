import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IPost} from "../types/posts.ts";
import {API_CONFIG} from "../config.ts";

export const postsSlice = createApi({
    reducerPath: "posts",
    baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.baseUrl }),
    endpoints: (build) => ({
        getPosts: build.query<IPost[], void>({
            query: () => ({
                url: "posts"
            }),
        }),
    }),
});


const postsReducer = postsSlice.reducer

export default postsReducer

export const postsReducerPath = postsSlice.reducerPath

export const postsMiddleware = postsSlice.middleware

export const {useGetPostsQuery} = postsSlice
