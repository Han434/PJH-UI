import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Business } from "../../types";

// 📦 API URL from .env or fallback
const api_url =
    (process.env.REACT_APP_API_URL || "http://localhost:4000/api") +
    "/business";

// 🧾 Business state interface
interface BusinessState {
    selectedBusiness: Business | null;
    loading: boolean;
    error: string | null;
}

// 🚀 Initial state
const initialState: BusinessState = {
    selectedBusiness: null,
    loading: false,
    error: null,
};

// 📥 Async thunk to fetch business by ID
export const fetchBusinessById = createAsyncThunk(
    "business/fetchBusinessById",
    async (id: string, { rejectWithValue }) => {
        try {
            const fullUrl = `${api_url}/${id}`;
            const response = await axios.get(fullUrl);

            return response.data.data; // Adjust if API shape changes
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch business"
            );
        }
    }
);

// 🧩 Redux Slice
const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBusinessById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedBusiness = null;
            })
            .addCase(
                fetchBusinessById.fulfilled,
                (state, action: PayloadAction<Business>) => {
                    state.loading = false;
                    state.selectedBusiness = action.payload;
                }
            )
            .addCase(fetchBusinessById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selectedBusiness = null;
            });
    },
});

export default businessSlice.reducer;
