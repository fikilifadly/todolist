const e = require("cors");
const { hashPass, comparePass, signToken } = require("../lib");
const { User } = require("../models");
module.exports = class UserController {
	static async login(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Email and Password is required", status: 400 };
			}

			const { email, password } = req.body;

			if (!email) throw { name: "Email is required", status: 400 };
			if (!password) throw { name: "Password is required", status: 400 };

			const data = await User.findOne({
				where: {
					email,
				},
			});

			if (!data) throw { name: "Invalid email/password", status: 401 };

			const matchPass = comparePass(password, data.password);
			if (!matchPass) throw { name: "Invalid email/password", status: 401 };

			const access_token = signToken({ id: data.id });

			res.status(200).json({ access_token });
		} catch (error) {
			next(error);
		}
	}

	static async register(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Username, Email and Password is required", status: 400 };
			}

			const { username, email, password } = req.body;

			if (!username) throw { name: "Username is required", status: 400 };
			if (!email) throw { name: "Email is required", status: 400 };
			if (!password) throw { name: "Password is required", status: 400 };

			const data = await User.findOne({
				where: {
					email,
				},
			});

			if (data) throw { name: "Email already registered", status: 400 };

			await User.create({
				username,
				email,
				password: hashPass(password),
			});

			res.status(201).json({ message: "Register Success" });
		} catch (error) {
			next(error);
		}
	}
};
