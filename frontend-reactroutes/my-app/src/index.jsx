import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errors/error-page";
import Root from "./routes/Root";
import Contact from "./routes/Contact";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/contacts/:id",
          element: <Contact/>,
          loader: 
        }
      ]
    }
  ]
);

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
