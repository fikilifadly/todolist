import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Taks from "./pages/Taks";
import Auth from "./layouts/Auth";
import SubTask from "./pages/SubTask";

const router = createBrowserRouter([
	{
		loader: async () => {
			if (localStorage.access_token) {
				return redirect("/");
			}
			return null;
		},
		element: <Auth />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
	{
		loader: async () => {
			if (!localStorage.access_token) {
				return redirect("/login");
			}
			return null;
		},
		element: <Dashboard />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/tasks",
				element: <Taks />,
			},
			{
				path: "/subtasks",
				element: <SubTask />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
