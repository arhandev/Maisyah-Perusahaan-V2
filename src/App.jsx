import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import DashboardLayout from "./components/DashboardLayout";
import UnauthenticatedRoutes from "./components/UnauthenticatedRoutes";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import CompanyProfile from "./pages/companyProfile";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/regiser/firstForm";
import SecondRegister from "./pages/regiser/secondForm";
import Notification from "./pages/notification";
import Lowongan from "./pages/lowongan";
import CreateLowongan from "./pages/lowongan/create_lowongan/CreateLowongan";
import Kandidat from "./pages/kandidat";
import Transaction from "./pages/transaction";
import CreateAddOns from "./pages/transaction/addons/CreateAddOns";
import EditLowongan from "./pages/lowongan/editLowongan/EditLowongan";

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
        element: (
          <DashboardLayout>
            <AuthenticatedRoutes />
          </DashboardLayout>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/company-profile",
            element: <CompanyProfile />,
          },
          {
            path: "/dashboard/notification",
            element: <Notification />,
          },
          {
            path: "/dashboard/lowongan",
            element: <Lowongan />,
          },
          {
            path: "dashboard/lowongan/create",
            element: <CreateLowongan />,
          },
          {
            path: "dashboard/lowongan/edit/:id",
            element: <EditLowongan />,
          },
          {
            path: "dashboard/kandidat",
            element: <Kandidat />,
          },
          {
            path: "dashboard/transaction",
            element: <Transaction />,
          },
          {
            path: "dashboard/transaction/addons",
            element: <CreateAddOns />,
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
