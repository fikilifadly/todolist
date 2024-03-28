import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const taskSlice = createSlice({
	name: "task",
	initialState: {
		tasks: [],
		currentTask: null,
		loading: true,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentRoom: (state) => {
			state.currentRoom = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTasks.pending, (state) => {
				console.log("first");

				state.loading = true;
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				console.log("first2");
				console.log(action);
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(getTasks.rejected, (state, action) => {
				console.log(action);
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(addTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTask.fulfilled, (state, { payload }) => {
				state.errorMessage = "";
				state.loading = false;
				console.log(payload, "======= fulfile");
				toast.success(payload.message);
			})
			.addCase(addTask.rejected, (state, action) => {
				console.log(action, "=======");
				state.loading = false;
				state.errorMessage = action.payload.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(updateTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateTask.fulfilled, (state, { payload }) => {
				state.errorMessage = "";
				state.loading = false;
				toast.success(payload.data.message);
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(deleteTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTask.fulfilled, (state, { payload }) => {
				state.errorMessage = "";
				state.loading = false;
				toast.success(payload.data.message);
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(getTaskById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTaskById.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.currentTask = payload;
			})
			.addCase(getTaskById.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
	},
});

export const getTasks = createAsyncThunk("task/getTasks", async (data, { rejectWithValue }) => {
	try {
		const { data: task } = await AxiosJSON.get("/task");
		return task;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const addTask = createAsyncThunk("task/addTask", async (data, { rejectWithValue }) => {
	try {
		const { data: task } = await AxiosJSON.post("/task", data);
		return task;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const updateTask = createAsyncThunk("task/updateTask", async (data, { rejectWithValue }) => {
	try {
		const { data: task } = await AxiosJSON.patch(`/task/${data._id}`, data);
		return task;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (data, { rejectWithValue }) => {
	try {
		const { data: task } = await AxiosJSON.delete(`/task/${data._id}`);
		return task;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getTaskById = createAsyncThunk("task/getTaskById", async (id, { rejectWithValue }) => {
	try {
		const { data: task } = await AxiosJSON.get(`/task/${id}`);
		return task;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const { setNullCurrentRoom } = taskSlice.actions;
export default taskSlice.reducer;
