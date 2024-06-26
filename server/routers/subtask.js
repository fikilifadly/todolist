const express = require("express");
const authentication = require("../middlewares/AuthHandler");
const SubtaskController = require("../controllers/SubtaskController");

const router = express.Router();

router.use(authentication);
router.get("/", SubtaskController.getSubtasks);
router.get("/:id", SubtaskController.getSubTaskById);
router.post("/", SubtaskController.addSubtask);
router.patch("/status/:id", SubtaskController.competeSubtask);
router.patch("/:id", SubtaskController.editSubtask);
router.delete("/:id", SubtaskController.deleteSubtask);

module.exports = router;
