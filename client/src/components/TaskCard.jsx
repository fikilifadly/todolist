import { getTaskById } from "../stores/taks_slice";
import { dateFormat, progressComplete, showModalHandler } from "../utils";

const TaskCard = ({ data, idModal, completeHandler }) => {
	const ctaHandler = (e) => {
		const { id, action } = e.target.dataset;
		getTaskById(id);
		if (action === "edit") {
			// console.log(currentClient, "from table====");
			showModalHandler();
		} else {
			showModalHandler(idModal);
		}
	};

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">{data.title}</h2>
				<p>{data.description && data.description}</p>
				<ul className="my-2">
					{data.SubTasks?.length > 0 ? (
						data.SubTasks.map((subtask, i) => (
							<li key={i} className="list-decimal">
								{subtask.title}
							</li>
						))
					) : (
						<li>No subtasks</li>
					)}
				</ul>

				<div className="flex flex-col gap-2">
					<p>
						Due Date: <span className={data.due_date < new Date() ? "text-red-500" : "text-green-500"}>{dateFormat(data.due_date)}</span>
					</p>

					<p>
						Status: <span className={`font-bold ${data.status === "complete" ? "text-green-500" : "text-blue-500"}`}>{data.status}</span>
					</p>

					<div className="flex gap-5 items-center">
						<span>Progress: </span>
						<div className="flex gap-2 items-center">
							<progress className="progress progress-success w-56" value={progressComplete(data.SubTasks)} max="100"></progress>
							<span>{progressComplete(data.SubTasks)}%</span>
						</div>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="card-actions">
						<input type="checkbox" className="checkbox border border-green-500" data-id={data.id} onChange={completeHandler} key={data.id} />
					</div>
					<div className="card-actions justify-end">
						<button className="btn btn-primary" data-id={data.id} data-action="edit" onClick={ctaHandler}>
							edit
						</button>
						<button className="btn btn-primary" data-id={data.id} data-action="delete" onClick={ctaHandler}>
							delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
