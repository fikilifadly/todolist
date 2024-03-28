import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taks_slice";
import subTaskSlice from "./subtaks_slice";
import userSlice from "./user_slice";

export const store = configureStore({
	reducer: {
		task: taskSlice,
		subTask: subTaskSlice,
		user: userSlice,
	},
});
