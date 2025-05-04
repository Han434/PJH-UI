import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";

// 📦 API URL
const api_url =
    (process.env.REACT_APP_API_URL || "http://localhost:4000/api/") + "user";

// 🧾 User state interface
interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

// 📦 Initial state
const initialState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
};

// 📥 Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    try {
        const response = await axios.get(api_url);
        return response.data.data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || "Failed to fetch users"
        );
    }
});

// 📥 Fetch one user by ID
export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${api_url}/${id}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to fetch user"
            );
        }
    }
);

// ➕ Create user
export const createUser = createAsyncThunk(
    "user/createUser",
    async (newUser: Omit<User, "_id">, { rejectWithValue }) => {
        try {
            const response = await axios.post(api_url, newUser);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.error || "Failed to create user"
            );
        }
    }
);

// ✏️ Update user
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (
        { id, updatedData }: { id: string; updatedData: Partial<User> },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.put(`${api_url}/${id}`, updatedData);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to update user"
            );
        }
    }
);

// 📥 Update user status (active/inactive)
export const updateUserStatus = createAsyncThunk(
    "user/updateUserStatus",
    async (
        { id, status }: { id: string; status: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.patch(`${api_url}/${id}/status`, {
                status,
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to update user status"
            );
        }
    }
);

// ❌ Delete user
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`${api_url}/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to delete user"
            );
        }
    }
);

// 🧩 User Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 📌 Fetch All
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.loading = false;
                    state.users = action.payload;
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            })

            // 📌 Fetch by ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedUser = null;
            })
            .addCase(
                fetchUserById.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.selectedUser = action.payload;
                }
            )
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selectedUser = null;
            })

            // 📌 Create
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.users.push(action.payload);
                }
            )
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // 📌 Update
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.users = state.users.map((user) =>
                        user._id === action.payload._id ? action.payload : user
                    );
                }
            )
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // 📌 Update User Status (active/inactive)
            .addCase(updateUserStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateUserStatus.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.users = state.users.map((user) =>
                        user._id === action.payload._id ? action.payload : user
                    );
                    if (
                        state.selectedUser &&
                        state.selectedUser._id === action.payload._id
                    ) {
                        state.selectedUser = action.payload;
                    }
                }
            )
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // 📌 Delete
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteUser.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.users = state.users.filter(
                        (user) => user._id !== action.payload
                    );
                }
            )
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
