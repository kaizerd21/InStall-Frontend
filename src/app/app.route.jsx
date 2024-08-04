import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./domain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [],
  },
  {
    path: "admin",
    element: null,
    children: [],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}
