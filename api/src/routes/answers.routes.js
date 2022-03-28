const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/answers.controller");

router.get("/api/global/answers/:questionid", controller.getAllQuestionAnswers);

router.get("/api/answers/", verifyToken, controller.getAllUserAnswers);
router.post(
  "/api/answer/vote/:fk_answer/:fk_question",
  verifyToken,
  controller.registerVote
);
router.post(
  "/api/create/answer/:fk_question",
  verifyToken,
  controller.newAnswer
);
router.put("/api/update/answer/:answerid", verifyToken, controller.editAnswer);
router.delete(
  "/api/delete/answer/:answerid",
  verifyToken,
  controller.deleteAnswer
);
module.exports = router;
