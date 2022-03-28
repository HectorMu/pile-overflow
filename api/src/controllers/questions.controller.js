const conn = require("../database");
const controller = {};

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

    tags.map(
      async (tag) =>
        await conn.query("update  question_tags set ? where fk_question = ?", [
          { fk_question: insertId, fk_tag: tag },
          id,
        ])
    );
    res.json({ status: true, statusText: "Question created and published" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
