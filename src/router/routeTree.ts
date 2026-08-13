import { rootRoute } from "./routes/root.route";
import { homeRoute } from "./routes/home.route";

export const routeTree = rootRoute.addChildren([
  homeRoute,
]);
