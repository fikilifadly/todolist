import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
	return (
		<>
			<div className="w-full h-screen bg-[#101828] mx-auto flex justify-center items-center">
				<div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
					<div className="flex flex-col gap-4">
						<div className="px-6 py-4">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
			<ToastContainer autoClose={1500} />
		</>
	);
};

export default Auth;
