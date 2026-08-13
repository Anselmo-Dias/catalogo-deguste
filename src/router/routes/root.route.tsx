import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      {/* Aqui ficaria qualquer layout global se necessário, ou apenas Outlet */}
      <Outlet />
    </>
  ),
});
