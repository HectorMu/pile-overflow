const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/questions.controller");

router.get("/api/global/questions", controller.getAllQuestions);
router.get("/api/global/questions/getone/:id", controller.getOneQuestionByID);
router.get("/api/global/questions/:title", controller.getOneQuestionByTitle);

router.get("/api/questions", verifyToken, controller.getUserQuestions);

router.post("/api/create/question", verifyToken, controller.newQuestion);
router.put("/api/update/question/:id", verifyToken, controller.editQuestion);

module.exports = router;
