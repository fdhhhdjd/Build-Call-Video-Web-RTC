//* LIB
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

//* IMPORT
import LoadingPage from "./pages/loading";
import router from "./routes";
import "./styles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} fallbackElement={<LoadingPage />} />
);
