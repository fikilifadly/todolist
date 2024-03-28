import { dateFormat, progressComplete } from "../utils";

const TaskCard = ({ data }) => {
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
				<div className="card-actions justify-end">
					<button className="btn btn-primary">edit</button>
					<button className="btn btn-primary">delete</button>
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
