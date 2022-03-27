import IsAlreadyLogged from "../components/Auth/IsAlreadyLogged";
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
  ],
};

export default Template;
