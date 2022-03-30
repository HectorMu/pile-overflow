const conn = require("../database");

const controller = {};

controller.getAllQuestionAnswers = async (req, res) => {
  const { questionid } = req.params;
  try {
    const answers = await conn.query(
      "select * from answer where fk_question = ?",
      [questionid]
    );
    const answerVotes = await conn.query("select * from answer_votes");

    const answersWithVotes = answers.map((answer) => ({
      ...answer,
      votes: answerVotes.filter(
        (vote) =>
          vote.fk_answer === answer.id &&
          vote.fk_question === answer.fk_question
      ).length,
    }));
    res.json(answersWithVotes);
  } catch (error) {
    console.log(error);
  }
};

controller.getOneUserAnswerFromQuestion = async (req, res) => {
  try {
    const data = await conn.query(
      "select * from answer where fk_user = ? && fk_question = ?",
      [req.user.id, req.params.fk_question]
    );

    if (!data.length > 0) {
      return res.json({});
    }

    const answer = data[0];
    return res.json(answer);
  } catch (error) {
    console.log(error);
  }
};

controller.getAllUserAnswers = async (req, res) => {
  try {
    const answers = await conn.query(
      "select a.id, a.answer, a.fk_question, q.question from answer a, question q where a.fk_question = q.id && a.fk_user = ?",
      [req.user.id]
    );
    res.json(answers);
  } catch (error) {
    console.log(error);
  }
};

controller.registerVote = async (req, res) => {
  try {
    const hasAlreadyVoted = await conn.query(
      "select * from answer_votes where fk_answer = ? && fk_question = ? && fk_user = ?",
      [req.params.fk_answer, req.params.fk_question, req.user.id]
    );
    if (hasAlreadyVoted.length > 0) {
      await conn.query(
        "delete from answer_votes where fk_answer = ? && fk_question = ? && fk_user = ?",
        [req.params.fk_answer, req.params.fk_question, req.user.id]
      );
      return res.json({ status: true, statusText: "Vote removed" });
    }

    await conn.query("insert into answer_votes set ?", [
      {
        fk_answer: req.params.fk_answer,
        fk_question: req.params.fk_question,
        fk_user: req.user.id,
      },
    ]);
    res.json({ status: true, statusText: "Vote added" });
  } catch (error) {
    console.log(error);
  }
};

controller.newAnswer = async (req, res) => {
  const { fk_question } = req.params;
  const { answer } = req.body;

  const questionAnswer = {
    fk_question,
    answer,
    fk_user: req.user.id,
  };
  try {
    const answerExists = await conn.query(
      "Select * from answer where fk_user = ? && fk_question = ?",
      [req.user.id, fk_question]
    );

    if (answerExists.length > 0) {
      await conn.query(
        "update  answer set ?  where fk_user = ? && fk_question = ?",
        [questionAnswer, req.user.id, fk_question]
      );
      return res.json({
        status: true,
        statusText: "Answer edited, thanks for your help!",
      });
    }
    await conn.query("insert into answer set ? ", [questionAnswer]);
    res.json({
      status: true,
      statusText: "Answer added, thanks for your help!",
    });
  } catch (error) {
    console.log(error);
  }
};

controller.editAnswer = async (req, res) => {
  const { answerid } = req.params;
  const { answer } = req.body;
  const questionAnswer = {
    answer,
    fk_user: req.user.id,
  };

  try {
    await conn.query("update answer set ? where id = ?", [
      questionAnswer,
      answerid,
    ]);
    res.json({
      status: true,
      statusText: "Answer edited",
    });
  } catch (error) {
    console.log(error);
  }
};

controller.deleteAnswer = async (req, res) => {
  const { answerid } = req.params;

  console.log(answerid);
  try {
    await conn.query("delete from answer_votes where fk_answer = ?", [
      answerid,
    ]);
    await conn.query("delete from answer where id = ?", [answerid]);
    res.json({
      status: true,
      statusText: "Answer deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
