const { Task, SubTask } = require("../models");

module.exports = class TaskController {
	static async getTasks(req, res, next) {
		try {
			const data = await Task.findAll({
				include: {
					model: SubTask,
				},
				where: {
					UserId: req.user.id,
				},
			});
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async addTask(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Bad Request", status: 400 };
			}

			const { name, description, due_date, status } = req.body;

			if (new Date(due_date) < new Date()) {
				throw { name: "Due date can't be less than today", status: 400 };
			}

			const data = await Task.findOne({
				where: {
					name,
					UserId: req.user.id,
				},
			});

			if (data) throw { name: "Task with that name already exists", status: 400 };

			if (!name) throw { name: "Name Task is required", status: 400 };
			await Task.create({
				name,
				description: description?.description,
				UserId: req.user.id,
				due_date,
				status: status?.status,
			});

			res.status(201).json({ message: "Task created successfully" });
		} catch (error) {
			next(error);
		}
	}

	static async editTask(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Bad Request", status: 400 };
			}

			const { id } = req.params;

			const data = await Task.findOne({
				where: {
					id,
					UserId: req.user.id,
				},
			});

			if (!data) throw { name: "Task not found", status: 404 };

			const { title, description, due_date, status } = req.body;

			console.log(new Date(due_date) < new Date(), new Date(due_date), new Date());
			if (new Date(due_date) < new Date()) {
				throw { name: "Due date can't be less than today", status: 400 };
			}

			if (!title && !description && !due_date && !status) throw { name: "Theres nothing to update", status: 400 };
			let newData = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => key in data && value !== undefined && value !== null && value !== ""));

			await data.update(newData);
			await data.save();

			res.status(200).json({ message: `Task ${data.name} successfully updated` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteTask(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Task.findOne({
				where: {
					id,
					UserId: req.user.id,
				},
			});
			if (!data) throw { name: "Task not found", status: 404 };
			await data.destroy();
			res.status(200).json({ message: `Task ${data.name} successfully deleted` });
		} catch (error) {
			next(error);
		}
	}

	static async completeTask(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Task.findOne({
				where: {
					id,
					UserId: req.user.id,
				},
			});

			if (!data) throw { name: "Task not found", status: 404 };

			if (data.subtasks.length > 0) {
				if (!data.subtasks.includes({ status: "ongoing" })) {
					await data.update({ status: "completed" });
					await data.save();
				}
			}
		} catch (error) {
			next(error);
		}
	}
};
