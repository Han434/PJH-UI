import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// 🔐 Auth state type
interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

// 🌱 Initial auth state
const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
};

// 🔐 Login thunk
export const login = createAsyncThunk(
    "auth/login",
    async (
        { userName, password }: { userName: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                userName,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);
            return token;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Invalid credentials"
            );
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
    return;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.token = action.payload;
                    state.error = null;
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.token = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.loading = false;
                state.error = null;
            });
    },
});

export default authSlice.reducer;
