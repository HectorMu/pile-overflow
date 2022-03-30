import API from "../../config/API";
import helpers from "@/helpers/helpers";

const getAllQuestions = async () => {
  try {
    const response = await fetch(`${API}/global/questions`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const createQuestion = async (data) => {
  try {
    const response = await fetch(
      `${API}/create/question`,
      helpers.authPostConfig(data)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateQuestion = async (data, id) => {
  try {
    const response = await fetch(
      `${API}/update/question/${id}`,
      helpers.authPutConfig(data)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteQuestion = async (id) => {
  try {
    const response = await fetch(
      `${API}/delete/question/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const markAsResolved = async (id) => {
  try {
    const response = await fetch(
      `${API}/question/resolved/${id}`,
      helpers.authPutConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getTags = async () => {
  try {
    const response = await fetch(`${API}/global/tags`, helpers.authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const searchQuestion = async (searchTerm) => {
  try {
    const response = await fetch(`${API}/global/questions/${searchTerm}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getQuestionByID = async (id) => {
  try {
    const response = await fetch(`${API}/global/questions/id/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const checkOwnership = async (id) => {
  try {
    const response = await fetch(
      `${API}/questions/checkownership/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default {
  searchQuestion,
  getQuestionByID,
  getTags,
  markAsResolved,
  createQuestion,
  updateQuestion,
  checkOwnership,
  deleteQuestion,
  getAllQuestions,
};
