import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./domain";
import Admin from "./domain/admin/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [],
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "dashboard",
        element: <h1>dashboard</h1>,
      },
      {
        path: "create-stall-unit",
        element: <h1>create-stall-unit</h1>,
      },
    ],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}
