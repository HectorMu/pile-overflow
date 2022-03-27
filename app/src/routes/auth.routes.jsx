import IsAlreadyLogged from "../components/Auth/IsAlreadyLogged";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";

const Template = {
  dev: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/login",
      element: <IsAlreadyLogged view={Login} />,
    },
    {
      path: "/signup",
      element: <IsAlreadyLogged view={Signup} />,
    },
  ],
};

export default Template;
