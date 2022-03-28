const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/questions.controller");

router.post("/api/create/question", verifyToken, controller.newQuestion);
router.put("/api/update/question/:id", verifyToken, controller.editQuestion);

module.exports = router;
