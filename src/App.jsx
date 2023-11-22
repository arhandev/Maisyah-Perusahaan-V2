import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import UnauthenticatedRoutes from "./components/UnauthenticatedRoutes";
import Login from "./pages/login";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import Dashboard from "./pages/dashboard";
import Register from "./pages/regiser/firstForm";
import SecondRegister from "./pages/regiser/secondForm";
import CompanyProfile from "./pages/companyProfile";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <UnauthenticatedRoutes />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "register/2",
            element: <SecondRegister />,
          },
        ],
      },
      {
        element: <AuthenticatedRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/company-profile",
            element: <CompanyProfile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
