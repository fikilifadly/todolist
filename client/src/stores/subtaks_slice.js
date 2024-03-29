import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const subTaskSlice = createSlice({
	name: "subTask",
	initialState: {
		subTasks: [],
		currentSubTask: null,
		loading: true,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentSubTask: (state) => {
			state.currentSubTask = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSubTasks.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSubTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.subTasks = action.payload;
			})
			.addCase(getSubTasks.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(addSubTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(addSubTask.fulfilled, (state, { payload }) => {
				state.errorMessage = "";
				state.loading = false;
				toast.success(payload.data.message);
			})
			.addCase(addSubTask.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(updateSubTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateSubTask.fulfilled, (state, { payload }) => {
				state.errorMessage = "";
				state.loading = false;
				toast.success(payload.data.message);
			})
			.addCase(updateSubTask.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(deleteSubTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteSubTask.fulfilled, (state, { payload }) => {
				state.errorMessage = "";
				state.loading = false;
				toast.success(payload.data.message);
			})
			.addCase(deleteSubTask.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(completeSubTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(completeSubTask.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.currentSubTask = payload;
				toast.success(payload.message);
			})
			.addCase(completeSubTask.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
	},
});

export const getSubTasks = createAsyncThunk("task/getSubTasks", async (data, { rejectWithValue }) => {
	try {
		const { data: subTasks } = await AxiosJSON.get("/subtask");
		return subTasks;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const addSubTask = createAsyncThunk("task/addSubTask", async (data, { rejectWithValue }) => {
	try {
		const { data: subTask } = await AxiosJSON.post("/subtask", data);
		return subTask;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const updateSubTask = createAsyncThunk("task/updateSubTask", async (data, { rejectWithValue }) => {
	try {
		const { data: subTask } = await AxiosJSON.patch("/subtask", data);
		return subTask;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const deleteSubTask = createAsyncThunk("task/deleteSubTask", async (data, { rejectWithValue }) => {
	try {
		const { data: subTask } = await AxiosJSON.delete(`/subtask/${data._id}`);
		return subTask;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const completeSubTask = createAsyncThunk("task/completeSubTask", async (id, { rejectWithValue }) => {
	try {
		const { data: task } = await AxiosJSON({
			method: "patch",
			url: `/subtask/status/${id}`,
		});
		return task;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const { setNullCurrentSubTask } = subTaskSlice.actions;
export default subTaskSlice.reducer;
