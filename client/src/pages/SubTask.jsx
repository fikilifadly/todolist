import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { removeModalHandler, showModalHandler } from "../utils";
import { addSubTask, deleteSubTask, getSubTaskById, getSubTasks, setNullCurrentSubTask, updateSubTask } from "../stores/subtaks_slice";
import { getTasks } from "../stores/taks_slice";

const SubTask = () => {
	const { subTasks, loading, currentSubTask } = useSelector((state) => state.subTask);
	const { tasks } = useSelector((state) => state.task);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSubTasks());
		dispatch(getTasks());
	}, [dispatch]);

	console.log(currentSubTask, "subtask page");

	const subTaskField = [
		["title", "text"],
		["description", "text"],
		["TaskId", tasks],
	];

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [title, description, TaskId] = e.target;

		const data = {
			title: title.value,
			description: description.value,
			TaskId: TaskId.value,
		};

		console.log(data, "====== submithandler");

		if (!currentSubTask) {
			dispatch(addSubTask(data)).then((res) => {
				console.log(res.payload, "=======");
				if (res.payload) {
					removeModalHandler();
					dispatch(getSubTasks());
				}
			});
		} else {
			dispatch(updateSubTask({ ...data, id: currentSubTask.id })).then((res) => {
				if (res.payload) {
					removeModalHandler();
					dispatch(getSubTasks());
				}
			});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentSubTask());
		showModalHandler();
	};

	const getDataByIdHandler = (id) => {
		console.log(id, "hndler ====");
		dispatch(getSubTaskById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteSubTask(currentSubTask.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(getSubTasks());
			}
		});
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Sub Tasks</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add
				</button>
			</div>
			<Table fields={subTaskField} data={subTasks} loading={loading} idModal="deleteSubtask" getDataByIdHandler={getDataByIdHandler} />
			<Modal title="Subtasks Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					{subTaskField.map((el, i) => {
						const isSelect = typeof el[1] === "object";
						return (
							<div className="py-2" key={i}>
								<label htmlFor={el[0]}>{el[0]}</label>
								{isSelect ? (
									<select name={el[0]} className="select mt-1 input input-bordered input-warning w-full ">
										{el[1].map((option, i) => (
											<option value={option.id} key={i} selected={currentSubTask?.[el[0]] === option.id}>
												{option.title}
											</option>
										))}
									</select>
								) : (
									<input
										type={el[1]}
										placeholder={`Enter ${el[0]}`}
										defaultValue={currentSubTask?.[el[0]]}
										className="mt-1 input input-bordered input-warning w-full "
										name={el[0]}
									/>
								)}
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>
			<Modal id="deleteSubtask">
				<div className="getflex flex-col gap-5">
					<p className="block">
						Are you sure want to delete <span className="font-bold">{currentSubTask?.title}</span> <span className="text-red-500"></span>?
					</p>
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

export default SubTask;
