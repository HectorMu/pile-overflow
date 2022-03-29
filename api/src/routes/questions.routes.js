const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/questions.controller");

router.get("/api/global/questions", controller.getAllQuestions);
router.get("/api/global/tags", controller.getAllTags);
router.get("/api/global/questions/id/:id", controller.getOneQuestionByID);
router.get(
  "/api/global/questions/getone/:title",
  controller.getOneQuestionByTitle
);
router.get("/api/global/questions/:title", controller.searchQuestionsByTitle);

router.get("/api/questions", verifyToken, controller.getUserQuestions);
router.get("/api/questions/:id", verifyToken, controller.getOneUserQuestion);
router.post("/api/create/question", verifyToken, controller.newQuestion);
router.put("/api/update/question/:id", verifyToken, controller.editQuestion);
router.put(
  "/api/question/resolved/:id",
  verifyToken,
  controller.flagQuestionAsResolved
);

router.delete(
  "/api/delete/question/:id",
  verifyToken,
  controller.deleteQuestion
);

router.get(
  "/api/questions/checkownership/:id",
  verifyToken,
  controller.checkIfItsUserQuestion
);

module.exports = router;
