import IsAlreadyLogged from "../components/Auth/IsAlreadyLogged";
import IsLoggedIn from "@/components/Auth/IsLoggedIn";
import Add from "@/pages/Questions/Add/Add";
import Index from "@/pages/Index/Index";

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
      element: <IsAlreadyLogged view={Index} />,
    },
    {
      path: "/newanswer",
      element: <IsLoggedIn view={Add} />,
    },
  ],
};

export default Template;
