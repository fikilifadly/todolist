import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, getTaskById, getTasks, setNullCurrentRoom, updateTask } from "../stores/taks_slice";
import Modal from "../components/Modal";
import { removeModalHandler, showModalHandler } from "../utils";
import Cards from "../components/Cards";

const taskField = [
	["title", "text"],
	["description", "text"],
	["due_date", "date"],
];

const Taks = () => {
	const { tasks, loading, currentTask } = useSelector((state) => state.task);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTasks());
	}, []);

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [title, description, due_date] = e.target;

		const data = {
			title: title.value,
			description: description.value,
			due_date: due_date.value,
		};

		if (!currentTask) {
			dispatch(addTask(data)).then((res) => {
				console.log(res.payload, "=======");
				if (res.payload) {
					removeModalHandler();
					dispatch(getTasks());
				}
			});
		} else {
			dispatch(updateTask({ ...data, id: currentTask.id })).then((res) => {
				if (res.payload) {
					removeModalHandler();
					dispatch(getTasks());
				}
			});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentRoom());
		showModalHandler();
	};

	const getTaskByIdHandler = (id) => {
		dispatch(getTaskById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteTask(currentTask.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(getTasks());
			}
		});
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Tasks</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add
				</button>
			</div>
			{/* <Table fields={roomFields} data={rooms} loading={loading} idModal="deleteRoom" getDataByIdHandler={getTaskByIdHandler} /> */}
			<Cards data={tasks} type="task" />
			<Modal title="Task Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					{taskField.map((el, i) => {
						return (
							<div className="py-2" key={i}>
								<label htmlFor={el[0]}>{el[0]}</label>
								<input type={el[1]} placeholder={`Enter ${el[0]}`} defaultValue={currentTask?.[el[0]]} className="mt-1 input input-bordered input-warning w-full " name={el[0]} />
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>
			<Modal id="deleteRoom">
				<div className="getflex flex-col gap-5">
					<p className="block">Are you sure want to delete {currentTask?.title}?</p>
					<div className="flex justify-end gap-2">
						<button className="btn bg-red-500 text-white" onClick={deleteHandler}>
							Yes
						</button>
						<button className="btn bg-green-500 text-white" onClick={removeModalHandler}>
							No
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Taks;
