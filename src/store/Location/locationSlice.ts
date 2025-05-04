import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Location } from "../../types";

// 📦 API URL
const api_url =
    (process.env.REACT_APP_API_URL || "http://localhost:4000/api") +
    "/location";

// 🧾 Location state interface
interface LocationState {
    locations: Location[];
    selectedLocation: Location | null;
    loading: boolean;
    error: string | null;
}

// 📦 Initial state
const initialState: LocationState = {
    locations: [],
    selectedLocation: null,
    loading: false,
    error: null,
};

// 📥 Fetch all locations
export const fetchLocations = createAsyncThunk(
    "location/fetchLocations",
    async () => {
        try {
            const response = await axios.get(api_url);
            return response.data.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message || "Failed to fetch locations"
            );
        }
    }
);

// 📥 Fetch one location by ID
export const fetchLocationById = createAsyncThunk(
    "location/fetchLocationById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${api_url}/${id}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to fetch location"
            );
        }
    }
);

// ➕ Create location
export const createLocation = createAsyncThunk(
    "location/createLocation",
    async (newLocation: Omit<Location, "_id">, { rejectWithValue }) => {
        try {
            const response = await axios.post(api_url, newLocation);
            return response.data.data;
        } catch (error: any) {
            console.error("Create Location Error:", error?.response?.data);
            return rejectWithValue(
                error?.response?.data?.error || "Failed to create location"
            );
        }
    }
);

// ✏️ Update location
export const updateLocation = createAsyncThunk(
    "location/updateLocation",
    async (
        { id, updatedData }: { id: string; updatedData: Partial<Location> },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.put(`${api_url}/${id}`, updatedData);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to update location"
            );
        }
    }
);

// ❌ Delete location
export const deleteLocation = createAsyncThunk(
    "location/deleteLocation",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`${api_url}/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to delete location"
            );
        }
    }
);

// 🧩 Location Slice
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 📌 Fetch All
            .addCase(fetchLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchLocations.fulfilled,
                (state, action: PayloadAction<Location[]>) => {
                    state.loading = false;
                    state.locations = action.payload;
                }
            )
            .addCase(fetchLocations.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch locations";
            })

            // 📌 Fetch by ID
            .addCase(fetchLocationById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedLocation = null;
            })
            .addCase(
                fetchLocationById.fulfilled,
                (state, action: PayloadAction<Location>) => {
                    state.loading = false;
                    state.selectedLocation = action.payload;
                }
            )
            .addCase(fetchLocationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selectedLocation = null;
            })

            // 📌 Create
            .addCase(createLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createLocation.fulfilled,
                (state, action: PayloadAction<Location>) => {
                    state.loading = false;
                    state.locations.push(action.payload);
                }
            )
            .addCase(createLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // 📌 Update
            .addCase(updateLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateLocation.fulfilled,
                (state, action: PayloadAction<Location>) => {
                    state.loading = false;
                    state.locations = state.locations.map((loc) =>
                        loc._id === action.payload._id ? action.payload : loc
                    );
                }
            )
            .addCase(updateLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // 📌 Delete
            .addCase(deleteLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteLocation.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.locations = state.locations.filter(
                        (loc) => loc._id !== action.payload
                    );
                }
            )
            .addCase(deleteLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default locationSlice.reducer;