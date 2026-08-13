import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { CatalogPage } from "@/features/catalog/pages/CatalogPage";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CatalogPage,
});
