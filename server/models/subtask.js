"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class SubTask extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			SubTask.belongsTo(models.Task, { foreignKey: "TaskId" });
		}
	}
	SubTask.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "title task is required",
					},
					notEmpty: {
						msg: "title task is required",
					},
				},
			},
			description: DataTypes.STRING,
			status: {
				type: DataTypes.STRING,
				defaultValue: "ongoing",
			},
			TaskId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "SubTask",
		}
	);

	SubTask.afterUpdate = async (subtask, options) => {
		const allSubtasks = await SubTask.findAll({ where: { TaskId: subtask.TaskId } });
		if (allSubtasks.every((el) => el.status === "completed")) {
			const task = await Model.Task.findByPk(subtask.TaskId);
			task.status = "completed";
			await task.save();
		}
	};

	return SubTask;
};
