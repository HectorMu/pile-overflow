import API from "../config/API";
import helpers from "../helpers/helpers";

const LogIn = async (credentials) => {
  try {
    const response = await fetch(
      `${API}/login`,
      helpers.postConfig(credentials)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const SignUp = async (registerInfo) => {
  try {
    const response = await fetch(
      `${API}/signup`,
      helpers.postConfig(registerInfo)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { SignUp, LogIn };
