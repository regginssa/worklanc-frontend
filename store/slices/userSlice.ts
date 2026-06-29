import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import AuthAPI, { getAuthToken } from "@/lib/api/auth";

import type { RootState } from "../store";

export type AuthStatus =
  | "idle" // not yet checked
  | "loading" // checking /me
  | "authenticated"
  | "unauthenticated";

interface UserState {
  user: User | null;
  status: AuthStatus;
}

const initialState: UserState = {
  user: null,
  status: "idle",
};

// Load the current identity from the backend using the stored token.
export const fetchMe = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    const token = getAuthToken();
    if (!token) return rejectWithValue("no-token");

    const data = await AuthAPI.me();
    if (!data?.user) return rejectWithValue("no-user");

    return data.user as User;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    clearUser(state) {
      state.user = null;
      state.status = "unauthenticated";
    },
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    setConnectsBalance(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.connectsBalance = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.status = "unauthenticated";
      });
  },
});

export const { setUser, clearUser, setStatus, setConnectsBalance } =
  userSlice.actions;

export const selectConnectsBalance = (state: RootState) =>
  state.user.user?.connectsBalance ?? 0;

export default userSlice.reducer;
