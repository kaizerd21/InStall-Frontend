import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./domain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
    children: [],
  },
  {
    path: "login",
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
