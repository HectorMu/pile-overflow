import API from "@/pages/config/API";
import helpers from "@/helpers/helpers";

const getAllUserQuestions = async () => {
  try {
    const response = await fetch(`${API}/questions`, helpers.authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getAllUserAnswers = async () => {
  try {
    const response = await fetch(`${API}/answers`, helpers.authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteAnswer = async (id) => {
  try {
    const response = await fetch(
      `${API}/delete/answer/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { getAllUserQuestions, getAllUserAnswers, deleteAnswer };
