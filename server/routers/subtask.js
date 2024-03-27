const express = require("express");
const authentication = require("../middlewares/AuthHandler");
const SubtaskController = require("../controllers/SubtaskController");

const router = express.Router();

router.use(authentication);
router.get("/", SubtaskController.getSubtasks);
router.post("/", SubtaskController.addSubtask);
router.patch("/:id", SubtaskController.editSubtask);
router.delete("/:id", SubtaskController.deleteSubtask);

module.exports = router;
