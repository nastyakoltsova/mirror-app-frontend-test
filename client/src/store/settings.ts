import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ISettings} from "../types/settings.ts";
import {API_CONFIG} from "../config.ts";

export const settingsSlice = createApi({
    reducerPath: "settings",
    baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.baseUrl }),
    endpoints: (build) => ({
        getSettings: build.query<ISettings, void>({
            query: () => ({
                url: "settings"
            }),
        }),
    }),
});


const settingsReducer = settingsSlice.reducer

export default settingsReducer

export const settingsReducerPath = settingsSlice.reducerPath

export const settingsMiddleware = settingsSlice.middleware

export const {useGetSettingsQuery} = settingsSlice
