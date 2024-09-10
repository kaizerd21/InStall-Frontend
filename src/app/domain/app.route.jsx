import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthShell } from "./shell/auth-shell";
import { LoginPage } from "./login/login";
import { MainShell } from "./shell/main-shell";
import { Dashboard } from "./dashboard/dashboard";
import Accounts from "./accounts/accounts";
import { ListAccounts } from "./accounts/list-accounts/list-accounts";
import { CreateAccount } from "./accounts/create-account/create-account";
import { StallUnits } from "./stall-units/stall-unit";
import { ListStallUnits } from "./stall-units/list-stall-units/list-stall-units";
import { CreateStallUnit } from "./stall-units/create-stall-unit/create-stall-unit";
import { ViewStallUnit } from "./stall-units/view-stall-unit/view-stall-unit";
import { EditStallUnit } from "./stall-units/edit-stall-unit/edit-stall-unit";
import { Tenants } from "./tenants/tenants";
import { ListTenants } from "./tenants/list-tenants/list-tenants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainShell />,
    children: [
      { path: "login", element: <LoginPage /> },
      {
        path: "management",
        element: <AuthShell />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "accounts",
            element: <Accounts />,
            children: [
              {
                path: "",
                element: <ListAccounts />,
              },
              {
                path: "create-account",
                element: <CreateAccount />,
              },
            ],
          },
          // TODO
          {
            path: "approval-queue",
            element: null,
          },
          {
            path: "archived-accounts",
            element: null,
          },
          {
            path: "all-invoices",
            element: null,
          },
          {
            path: "ledger",
            element: null,
          },
          {
            path: "rental-income",
            element: null,
          },
          {
            path: "unpaid-invoices",
            element: null,
          },
          // TODO
          {
            path: "stall-units",
            element: <StallUnits />,
            children: [
              {
                path: '',
                element: <ListStallUnits />
              },
              {
                path: 'create-stall-unit',
                element: <CreateStallUnit />
              },
              {
                path: 'view-stall-unit/:stallID',
                element: <ViewStallUnit />
              },
              {
                path: 'edit-stall-unit/:stallID',
                element: <EditStallUnit />
              }
            ]
          },
          {
            path: "tenants",
            element: <Tenants />,
            children: [
              {
                path: '',
                element: <ListTenants />
              },
              {
                path: 'create-tenant',
                element: null
              },
              {
                path: 'assign-stall-unit',
                element: null
              },
            ]
          },
        ],
      },
    ],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}
