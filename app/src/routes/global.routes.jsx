import Index from "../pages/Index/Index";
import Add from "../pages/Questions/Add/Add";
import Results from "../pages/Questions/Search/Results";
import Details from "../pages/Questions/Details/Details";

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
      path: "/search/:term",
      element: <Results />,
    },
    {
      path: "/question/:id/:title",
      element: <Details />,
    },
  ],
};

export default Template;
