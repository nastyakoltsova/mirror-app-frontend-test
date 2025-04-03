import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, {settingsMiddleware, settingsReducerPath} from "./settings.ts";
import postsReducer, {postsMiddleware, postsReducerPath} from "./posts.ts";
import usersReducer, {usersMiddleware, usersReducerPath} from "./users.ts";

const rootReducer = combineReducers({
    [settingsReducerPath]: settingsReducer,
    [postsReducerPath]: postsReducer,
    [usersReducerPath]: usersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([settingsMiddleware, postsMiddleware, usersMiddleware])
    },
})

export type RootState = ReturnType<typeof rootReducer>;
