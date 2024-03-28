import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Taks from "./pages/Taks";

const router = createBrowserRouter([
	{
		// loader: async () => {
		// 	if (localStorage.access_token) {
		// 		return redirect("/");
		// 	}
		// 	return null;
		// },
		path: "/login",
		element: <Login />,
	},
	{
		// loader: async () => {
		// 	if (localStorage.access_token) {
		// 		return redirect("/");
		// 	}
		// 	return null;
		// },
		path: "/register",
		element: <Register />,
	},
	{
		// loader: async () => {
		// 	if (!localStorage.access_token) {
		// 		return redirect("/login");
		// 	}
		// 	return null;
		// },
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
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
