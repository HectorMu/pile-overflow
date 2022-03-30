import API from "@/pages/config/API";
import helpers from "@/helpers/helpers";

const getQuestionAnswers = async (questionid) => {
  try {
    const response = await fetch(`${API}/global/answers/${questionid}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getUserCurrentAnswerFromQuestion = async (questionid) => {
  try {
    const response = await fetch(
      `${API}/get/ownanswer/${questionid}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const saveAnswer = async (answer, fk_question) => {
  try {
    const response = await fetch(
      `${API}/create/answer/${fk_question}`,
      helpers.authPostConfig(answer)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteAnswer = async (fk_answer) => {
  try {
    const response = await fetch(
      `${API}/delete/answer/${fk_answer}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const addVoteToAnswer = async (fk_answer, fk_question) => {
  try {
    const response = await fetch(
      `${API}/answer/vote/${fk_answer}/${fk_question}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default {
  getQuestionAnswers,
  getUserCurrentAnswerFromQuestion,
  saveAnswer,
  deleteAnswer,
  addVoteToAnswer,
};
