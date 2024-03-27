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
			SubTask.hasMany(models.Task, { foreignKey: "SubtaskId" });
		}
	}
	SubTask.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Name is required",
					},
					notEmpty: {
						msg: "Name is required",
					},
				},
			},
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "SubTask",
		}
	);
	return SubTask;
};
