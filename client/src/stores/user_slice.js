import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		loading: true,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				console.log(payload);
				state.currentUser = payload.name;
				state.loading = false;
				toast.success("login Success");
			})
			.addCase(login.rejected, (state, { payload }) => {
				console.log(payload, "=====");
				state.loading = false;
				if (payload.message == "rejected") {
					state.errorMessage = "Something wrong, please refresh";
				} else {
					state.errorMessage = payload.message;
					toast.error(state.errorMessage);
				}
			});

		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.currentUser = payload;
				state.loading = false;
				toast.success(payload.message);
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.loading = false;
				state.errorMessage = payload.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(editProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(editProfile.fulfilled, (state, { payload }) => {
				state.currentUser = payload;
				state.loading = false;
				toast.success(payload.message);
			})
			.addCase(editProfile.rejected, (state, { payload }) => {
				state.loading = false;
				state.errorMessage = payload.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(getProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				console.log(payload, " ===");
				state.currentUser = payload;
				state.loading = false;
			})
			.addCase(getProfile.rejected, (state, { payload }) => {
				state.loading = false;
				state.errorMessage = payload.message;
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

		if (result) {
			localStorage.setItem("access_token", result.access_token);

			AxiosJSON.defaults.headers.common["Authorization"] = `Bearer ${result.access_token}`;
			console.log(AxiosJSON.defaults.headers, "==== token");
		}
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

export const getProfile = createAsyncThunk("user/getProfile", async (data, { rejectWithValue }) => {
	try {
		const { data: result } = await AxiosJSON({
			url: "/user/profile",
		});
		return result;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const { setNullCurrentUser } = userSlice.actions;
export default userSlice.reducer;
