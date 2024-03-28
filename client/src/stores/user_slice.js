import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentuser: null,
		loading: true,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentUser: (state) => {
			state.currentuser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.currentuser = payload;
				state.loading = false;
				toast.success(payload.message);
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.currentuser = payload;
				state.loading = false;
				toast.success(payload.message);
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(editProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(editProfile.fulfilled, (state, { payload }) => {
				state.currentuser = payload;
				state.loading = false;
				toast.success(payload.message);
			})
			.addCase(editProfile.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
	},
});

export const login = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
	try {
		const { data: result } = await AxiosJSON({
			method: "POST",
			url: "/user/login",
			data,
		});
		return result;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const register = createAsyncThunk("user/register", async (data, { rejectWithValue }) => {
	try {
		const { data: result } = await AxiosJSON({
			method: "POST",
			url: "/user/register",
			data,
		});
		return result;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const editProfile = createAsyncThunk("user/editProfile", async (data, { rejectWithValue }) => {
	try {
		const { data: result } = await AxiosJSON({
			method: "POST",
			url: "/user/editProfile",
			data,
		});
		return result;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const { setNullCurrentUser } = userSlice.actions;
export default userSlice.reducer;
