import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
	const navigate = useNavigate();

	const isActive = ({ isActive }) => (isActive ? "flex gap-3 py-2 px-3 items-center bg-green-500 rounded-lg text-white" : "flex gap-3 py-2 px-3 items-center");
	const logOutHandler = () => {
		localStorage.removeItem("access_token");
		toast.success("Logout Success");
		navigate("/login");
	};

	return (
		<div className="sticky top-0  w-full md:w-[25%] flex flex-col justify-between">
			<nav className="p-5 flex flex-col justify-between gap-3 bg-[#101828]">
				<div className="flex items-center">
					<h1 className="text-3xl text-green-500">Task Management</h1>
				</div>
				<ul className={`text-white  flex flex-col gap-1`}>
					<li>
						<NavLink to="/" className={isActive}>
							<span className="text-md">Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/tasks" className={isActive}>
							<span className="text-md">Tasks</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/subtasks" className={isActive}>
							<span className="text-md">Sub Tasks</span>
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className="p-5  flex flex-col justify-between gap-3 bg-[#101828] h-fit">
				<button className={"flex gap-3 py-2 px-3 items-center bg-white rounded-lg text-green-500 font-extrabold justify-center"} onClick={logOutHandler}>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default SideBar;
