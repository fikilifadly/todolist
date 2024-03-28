import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/SideBar";
const Dashboard = () => {
	return (
		<div className="flex flex-col md:flex-row bg-[#101828] w-full h-full">
			<SideBar />
			<div className="h-screen md:h-[97.5vh] md:mt-[2.5vh] bg-white w-screen border md:rounded-tl-[2.5rem] px-8 py-10 overflow-auto">
				<Outlet />
			</div>
			<ToastContainer autoClose={1500} />
		</div>
	);
};

export default Dashboard;
