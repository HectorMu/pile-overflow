import IsAlreadyLogged from "../components/Auth/IsAlreadyLogged";
import IsLoggedIn from "@/components/Auth/IsLoggedIn";
import Add from "@/pages/Questions/Add/Add";
import Home from "../pages/Home/Home";

const Template = {
  dev: [
    {
      path: "/home",
      element: <Home />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/home",
      element: <IsAlreadyLogged view={Home} />,
    },
    {
      path: "/newanswer",
      element: <IsLoggedIn view={Add} />,
    },
  ],
};

export default Template;
