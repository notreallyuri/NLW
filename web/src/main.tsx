import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Providers } from "./providers/index.tsx";
import { routes } from "./routes.tsx";

//  biome-ignore lint/style/noNonNullAssertion: mandatory by React
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={routes} />
    </Providers>
  </StrictMode>
);
