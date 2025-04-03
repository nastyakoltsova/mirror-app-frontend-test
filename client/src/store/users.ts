import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUser} from "../types/users.ts";
import {API_CONFIG} from "../config.ts";


export const usersSlice = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.baseUrl }),
    endpoints: (build) => ({
        getUsers: build.query<IUser[], void>({
            query: () => ({
                url: "users"
            }),
        }),
    }),
});


const usersReducer = usersSlice.reducer

export default usersReducer

export const usersReducerPath = usersSlice.reducerPath

export const usersMiddleware = usersSlice.middleware

export const {useGetUsersQuery} = usersSlice
