import AuthRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import globalRoutes from "./global.routes";

const AppRoutes = {
  dev: [...AuthRoutes.dev, ...userRoutes.dev, ...globalRoutes.dev],
  prod: [
    ...AuthRoutes.production,
    ...userRoutes.production,
    ...globalRoutes.production,
  ],
};

export default AppRoutes;
