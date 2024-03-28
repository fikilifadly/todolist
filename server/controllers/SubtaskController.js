const { where } = require("sequelize");
const { SubTask, Task } = require("../models");
module.exports = class SubtaskController {
	static async getSubtasks(req, res, next) {
		try {
			const data = await SubTask.findAll({
				include: {
					model: Task,
					where: {
						UserId: req.user.id,
					},
				},
			});
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async getSubTaskById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await SubTask.findOne({
				where: {
					id,
					UserId: req.user.id,
				},
			});
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async addSubtask(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Bad Request", status: 400 };
			}

			const { title, description, status, TaskId } = req.body;

			if (!title) throw { name: "Title Subtask is required", status: 400 };
			if (!TaskId) throw { name: "TaskId is required", status: 400 };

			const data = await SubTask.findOne({
				include: {
					model: Task,
					where: {
						UserId: req.user.id,
					},
				},
				where: {
					title,
				},
			});

			if (data) throw { name: "Subtask with that name already exists", status: 400 };

			await SubTask.create({
				title,
				description: description?.description,
				TaskId,
				status: status?.status,
			});

			res.status(201).json({ message: "Subtask created successfully" });
		} catch (error) {
			next(error);
		}
	}

	static async editSubtask(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Bad Request", status: 400 };
			}

			const subtask = await SubTask.findOne({
				include: {
					model: Task,
					where: {
						UserId: req.user.id,
					},
				},
				where: {
					id: req.params.id,
				},
			});

			if (!subtask) throw { name: "Subtask not found", status: 404 };

			const { title, description, status } = req.body;
			if (!title && !description && !status) throw { name: "Theres nothing to update", status: 400 };

			const isUnique = await SubTask.findOne({
				include: {
					model: Task,
				},
				where: {
					title,
				},
			});

			if (isUnique && isUnique.id != subtask.id) throw { name: "Subtask with that name already exists", status: 400 };

			let newSubtask = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => key in subtask && value !== undefined && value !== null && value !== ""));

			await subtask.update(newSubtask);
			await subtask.save();

			res.status(200).json({ message: `Subtask ${subtask.title} updated successfully` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteSubtask(req, res, next) {
		try {
			const { id } = req.params;

			const data = await SubTask.findOne({
				include: {
					model: Task,
					where: {
						UserId: req.user.id,
					},
				},
				where: {
					id,
				},
			});

			if (!data) throw { name: "Subtask not found", status: 404 };

			await SubTask.destroy({
				where: {
					id,
				},
			});

			res.status(200).json({ message: `Subtask ${data.title} deleted successfully` });
		} catch (error) {
			next(error);
		}
	}
};
