// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import businessReducer from "./Business/businessSlice";
import locationReducer from "./Location/locationSlice";
import themeReducer from "./Theme/themeSlice";
import authReducer from "./Auth/authSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        business: businessReducer,
        location: locationReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
