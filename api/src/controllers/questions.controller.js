const conn = require("../database");
const controller = {};

controller.getAllQuestions = async (req, res) => {
  try {
    const questions = await conn.query("select * from question");

    const tags = await conn.query(
      "SELECT qt.fk_question, qt.fk_tag, g.description FROM question_tags qt, tag g WHERE qt.fk_tag = g.id"
    );

    const questionsWithTags = questions.map((question) => ({
      ...question,
      tags: tags.filter((tag) => tag.fk_question === question.id),
    }));
    res.json(questionsWithTags);
  } catch (error) {
    console.log(error);
  }
};

controller.getAllTags = async (req, res) => {
  try {
    const tags = await conn.query("select * from tag");
    res.json(tags);
  } catch (error) {
    console.log(error);
  }
};

controller.getOneQuestionByID = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await conn.query("select * from question where id = ?", [id]);
    const question = data[0];
    if (!question) {
      return res.json({});
    }
    const tags = await conn.query(
      "SELECT qt.fk_question, qt.fk_tag, g.description FROM question_tags qt, tag g WHERE qt.fk_tag = g.id && fk_question = ?",
      id
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

controller.getOneQuestionByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const data = await conn.query(
      `select * from question where question like '%${title}%'`
    );
    const question = data[0];

    const tags = await conn.query(
      "SELECT qt.fk_question, qt.fk_tag, g.description FROM question_tags qt, tag g WHERE qt.fk_tag = g.id && fk_question = ?",
      question.id
    );

    const questionAndTags = {
      ...question,
      tags,
    };
    res.json(questionAndTags);
  } catch (error) {
    console.log(error);
  }
};

controller.getUserQuestions = async (req, res) => {
  try {
    const questions = await conn.query(
      "select * from question where fk_user = ?",
      [req.user.id]
    );

    const tags = await conn.query(
      "SELECT qt.fk_question, qt.fk_tag, g.description FROM question_tags qt, tag g WHERE qt.fk_tag = g.id"
    );

    const questionsWithTags = questions.map((question) => ({
      ...question,
      tags: tags.filter((tag) => tag.fk_question === question.id),
    }));
    res.json(questionsWithTags);
  } catch (error) {
    console.log(error);
  }
};

controller.getOneUserQuestion = async (req, res) => {
  try {
    const data = await conn.query(
      "select * from question where fk_user = ? && id = ?",
      [req.user.id, req.params.id]
    );

    const question = data[0];

    const tags = await conn.query(
      "SELECT qt.fk_question, qt.fk_tag, g.description FROM question_tags qt, tag g WHERE qt.fk_tag = g.id && fk_question = ?",
      question.id
    );

    const questionsWithTags = {
      ...question,
      tags,
    };
    res.json(questionsWithTags);
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
    res.json({ status: true, statusText: "Question edited" });
  } catch (error) {
    console.log(error);
  }
};

controller.flagQuestionAsResolved = async (req, res) => {
  try {
    await conn.query(`update question set status = 'Resolved' where id = ?`, [
      req.params.id,
    ]);
    res.json({ status: true, statusText: "Question flagged as resolved" });
  } catch (error) {
    console.log(error);
  }
};

controller.deleteQuestion = async (req, res) => {
  try {
    await conn.query("delete from answer where fk_question = ?", [
      req.params.id,
    ]);
    await conn.query("delete from question_tags where fk_question = ? ", [
      req.params.id,
    ]);
    await conn.query("delete from question where id = ?", [req.params.id]);
    res.json({ status: true, statusText: "Question and all answers deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
