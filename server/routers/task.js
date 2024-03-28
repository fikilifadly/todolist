const express = require("express");
const authentication = require("../middlewares/AuthHandler");
const TaskController = require("../controllers/TaskController");

const router = express.Router();
router.use(authentication);

router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.addTask);
router.patch("/:id", TaskController.editTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
