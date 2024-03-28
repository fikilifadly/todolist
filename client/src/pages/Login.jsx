import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../stores/user_slice";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const [email, password] = e.target;
		const data = {
			email: email.value,
			password: password.value,
		};

		dispatch(login(data)).then((res) => {
			console.log(res.error, !res.error);
			if (!res.error) {
				navigate("/");
			}
		});
	};

	return (
		<>
			<h1 className="mt-3 text-2xl font-medium text-center text-gray-600 dark:text-gray-200">Login</h1>

			<form onSubmit={onSubmitHandler}>
				<div className="w-full mt-4">
					<input
						className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
						type="email"
						name="email"
						placeholder="Email Address"
						aria-label="Email Address"
					/>
				</div>

				<div className="w-full mt-4">
					<input
						className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
						type="password"
						name="password"
						placeholder="Password"
						aria-label="Password"
					/>
				</div>

				<div className="flex items-center justify-center mt-4">
					<button className="btn bg-green-600 text-white px-10">submit</button>
				</div>
				<div className="flex justify-center mt-3 text-sm">
					<p>
						doesnt have an account?{" "}
						<Link to="/register" className="text-blue-600 font-bold">
							Register
						</Link>
					</p>
				</div>
			</form>
		</>
	);
};

export default Login;
