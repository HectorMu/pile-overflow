const conn = require("../database");
const controller = {};

controller.getAllQuestions = async (req, res) => {
  try {
    const questions = await conn.query("select * from question");
    res.json(questions);
  } catch (error) {
    console.log(error);
  }
};

controller.getOneQuestionByID = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await conn.query("select * from question where id = ?", [id]);
    const question = data[0];
    res.json(question);
  } catch (error) {
    console.log(error);
  }
};

controller.getOneQuestionByTitle = async (req, res) => {
  const { title } = req.params;

  console.log(title);
  try {
    const data = await conn.query(
      `select * from question where question like '%${title}%'`
    );

    const question = data[0];
    const tags = await conn.query(
      "select * from question_tags where fk_question = ?",
      question.id
    );

    const questionAndTags = {
      ...question,
      tags: tags,
    };
    res.json(questionAndTags);
  } catch (error) {
    console.log(error);
  }
};

controller.getUserQuestions = async (req, res) => {
  try {
    const questions = await conn.query(
      "select * from question where fk_ user = ?",
      [req.user.id]
    );
    res.json(questions);
  } catch (error) {
    console.log(error);
  }
};

controller.newQuestion = async (req, res) => {
  const user = req.user.id;
  const { question, description, tags } = req.body;
  //getting the required data from body
  const newQuestion = {
    fk_user: user,
    question,
    description,
    status: "Unresolved",
  };
  try {
    const { insertId } = await conn.query("insert into question set ?", [
      newQuestion,
    ]);

    tags.map(
      async (tag) =>
        await conn.query("insert into question_tags set ?", [
          { fk_question: insertId, fk_tag: tag },
        ])
    );
    res.json({ status: true, statusText: "Question created and published" });
  } catch (error) {
    console.log(error);
  }
};

controller.editQuestion = async (req, res) => {
  const user = req.user.id;
  const { id } = req.params;
  const { question, description, tags } = req.body;
  //getting the required data from body
  const newQuestion = {
    fk_user: user,
    question,
    description,
    status: "Unresolved",
  };
  try {
    await conn.query("update question set ? where id = ?", [newQuestion, id]);

    await conn.query("delete  from question_tags where fk_question = ?", [id]);
    tags.map(
      async (tag) =>
        await conn.query("insert into question_tags set ?", [
          { fk_question: id, fk_tag: tag },
        ])
    );
    res.json({ status: true, statusText: "Question created and published" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
