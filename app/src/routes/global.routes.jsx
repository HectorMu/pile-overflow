import Index from "../pages/Index/Index";

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
  ],
};

export default Template;
