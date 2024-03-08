import React from "react";
import {createRoot} from "react-dom/client";
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./errors/error-page";
import Contact from "./routes/contact";

const router = createBrowserRouter([
  {
  path:"/",
  element:<Root/>,
  errorElement:<ErrorPage />,
  children:[
    {
      path:"/contact",
      element:<Contact />,
    },
  ]
  },
]);

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
)