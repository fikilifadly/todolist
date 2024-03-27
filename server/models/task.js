"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Task.belongsTo(models.User, { foreignKey: "UserId" });
			Task.hasMany(models.SubTask, { foreignKey: "TaskId" });
		}
	}
	Task.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Task with that title already exists",
				},
				validate: {
					notNull: {
						msg: "title subtask is required",
					},
					notEmpty: {
						msg: "title subtask is required",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
			},
			status: {
				type: DataTypes.STRING,
				defaultValue: "ongoing",
			},
			due_date: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Due date is required",
					},
					notEmpty: {
						msg: "Due date is required",
					},
				},
			},
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Task",
		}
	);
	return Task;
};
