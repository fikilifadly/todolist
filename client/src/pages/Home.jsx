import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../stores/user_slice";
import Cards from "../components/Cards";
import { getTasks } from "../stores/taks_slice";
import { getSubTasks } from "../stores/subtaks_slice";
const Home = () => {
	const { currentUser } = useSelector((state) => state.user);
	const { tasks, loading: taskLoading } = useSelector((state) => state.task);
	const { subTasks, loading: subTaskLoading } = useSelector((state) => state.subTask);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfile());
		dispatch(getTasks());
		dispatch(getSubTasks());
	}, [dispatch]);

	// console.log(currentUser);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col justify-between">
				<h2 className="text-3xl font-bold">
					Welcome Back, <span className="text-green-600">{currentUser?.username}</span>
				</h2>
				<p className="text-gray-500">Track, manage your task here</p>
			</div>

			<Cards
				data={[
					{
						title: "Tasks",
						total: tasks?.length,
						loading: taskLoading,
						complete: tasks?.filter((task) => task.isCompleted).length,
						ongoing: tasks?.filter((task) => !task.isCompleted).length,
					},
					{
						title: "Subtasks",
						total: subTasks?.length,
						loading: subTaskLoading,
						complete: subTasks?.filter((task) => task.isCompleted).length,
						ongoing: subTasks?.filter((task) => !task.isCompleted).length,
					},
				]}
			/>
		</div>
	);
};

export default Home;
