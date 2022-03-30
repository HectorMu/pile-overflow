import IsAlreadyLogged from "../components/Auth/IsAlreadyLogged";
import IsLoggedIn from "@/components/Auth/IsLoggedIn";
import Add from "@/pages/Questions/Add/Add";
import Index from "@/pages/Index/Index";
import Questions from "@/pages/User/Questions/Questions";
import Answers from "@/pages/User/Answers/Answers";

const Template = {
  dev: [
    {
      path: "/",
      element: <Index />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/newquestion",
      element: <IsLoggedIn view={Add} />,
    },
    {
      path: "/me/questions",
      element: <IsLoggedIn view={Questions} />,
    },
    {
      path: "/me/answers",
      element: <IsLoggedIn view={Answers} />,
    },
  ],
};

export default Template;
