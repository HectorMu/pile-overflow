import AuthRoutes from "./auth.routes";

const AppRoutes = {
  dev: [...AuthRoutes.dev],
  prod: [...AuthRoutes.production],
};

export default AppRoutes;
