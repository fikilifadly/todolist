"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tasks", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.STRING,
			},
			due_date: {
				type: Sequelize.DATE,
			},
			UserId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
			},
			SubtaskId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "SubTasks",
					},
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tasks");
	},
};