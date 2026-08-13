import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-bg text-text-soft">
      <p className="text-sm font-medium animate-pulse">Carregando...</p>
    </div>
  ),
  defaultErrorComponent: ({ error }) => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg text-error p-4 text-center">
      <h2 className="text-xl font-bold mb-2">Ops! Ocorreu um erro</h2>
      <p className="text-sm text-text-soft">{error.message}</p>
    </div>
  ),
});

// Registrar o tipo do router para tipagem segura global
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
