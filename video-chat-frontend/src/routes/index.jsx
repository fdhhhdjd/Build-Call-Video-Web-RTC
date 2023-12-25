//* LIB
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//* IMPORT
import DashboardPage from "../pages/dashboard/page";
import LoginPage from "../pages/login/page";
import NotFoundPage from "../pages/notfound/page";
import ErrorPage from "../pages/error";
import { store } from "../providers/redux/store";
import App from "../App";

const routes = [
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
        <Outlet />
      </Provider>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
