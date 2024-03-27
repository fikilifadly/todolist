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
			Task.belongsTo(models.SubTask, { foreignKey: "SubtaskId" });
		}
	}
	Task.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Task with that name already exists",
				},
				validate: {
					notNull: {
						msg: "Name is required",
					},
					notEmpty: {
						msg: "Name is required",
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
			SubtaskId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Task",
		}
	);
	return Task;
};
