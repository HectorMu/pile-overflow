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

export default { getQuestionAnswers };
