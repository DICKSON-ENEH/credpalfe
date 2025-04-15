import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from "./layout/authwrapper";
import Register from "./auth/register";
import Login from "./auth/login";
import Dashboardwrapper from "./layout/dashboardwrapper";
import Wallet from "./client/wallet";
import ErrorPage from "./components/ErrorPage";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthWrapper />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "",
    element: <Dashboardwrapper />,

    children: [
      {
        path: "/",
        element: <Wallet />,
        errorElement: <ErrorPage />
      },
    ],
  },
]);
