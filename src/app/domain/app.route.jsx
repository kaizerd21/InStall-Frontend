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
import { CreateTenant } from "./tenants/create-tenant/create-tenant";
import { AssignTenantToStall } from "./tenants/assign-tenant/assign-tenant-to-stall";
import MainElectricity from "./electricity-invoice/electricity-invoice";
import ListElectricityInvoices from "./electricity-invoice/list-electricity-invoice/list-electricity-invoice";
import CreateElectricityInvoice from "./electricity-invoice/create-electricity-invoice/create-electricity-invoice";
import Invoices from "./invoices/invoice";
import ListInvoiceMonths from "./invoices/list-invoice/list-invoice-months";
import CreateInvoice from "./invoices/create-invoice/create-invoice";
import ListInvoices from "./invoices/list-invoice/list-invoices";
import PayDueInvoicesMain from "./invoices/pay-invoice/pay-due-invoices.main";
import ListInvoicesForPayment from "./invoices/pay-invoice/list-invoices-for-payment";
import PayInvoice from "./invoices/pay-invoice/pay-invoice";
import InvoiceReceipt from "./invoices/pay-invoice/invoice-receipt";
import ViewTenant from "./tenants/view-tenant/view-tenant";
import { ArchivedAccounts } from "./accounts/list-accounts/archived-accounts";
import ApprovalQueue from "./accounts/approval-queue/approval-queue";
import ApproveTenant from "./accounts/approval-queue/approve-tenant";

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
              {
                path: "approval-queue",
                element: <ApprovalQueue />,
              },
              {
                path: "approve-tenant/:id",
                element: <ApproveTenant />,
              },
              {
                path: "archived-accounts",
                element: <ArchivedAccounts />,
              },
            ],
          },
          // TODO
          {
            path: "all-invoices",
            element: <Invoices />,
            children: [
              {
                path: "",
                element: <ListInvoiceMonths />,
              },
              {
                path: "main-electricity",
                element: <ListElectricityInvoices />,
              },
              {
                path: "create-electricity-invoice",
                element: <CreateElectricityInvoice />,
              },
              {
                path: "create-invoice",
                element: <CreateInvoice />,
              },
              {
                path: "list-invoice",
                element: <ListInvoiceMonths />,
              },
              {
                path: "view-invoices/:month/:year",
                element: <ListInvoices />,
              },
              {
                path: "view-invoice/:id",
                element: <PayInvoice />,
              },
              {
                path: "archived-invoices",
                element: <ListInvoiceMonths status="archived" />,
              },
              {
                path: "archived-invoices/:month/:year",
                element: <ListInvoices status="archived" />,
              },
              {
                path: "pay-due-invoices",
                element: <PayDueInvoicesMain />,
                children: [
                  {
                    path: "",
                    element: <ListInvoicesForPayment />
                  },
                  {
                    path: "view-invoice/:id",
                    element: <PayInvoice payInvoice={true} />
                  }
                ]
              },
              {
                path: "view-receipt/:id",
                element: <InvoiceReceipt />,
              },
              {
                path: "ledger",
                element: null,
              },
            ]
          },
          {
            path: "rental-income",
            element: null,
            children: [
              {
                path: "unpaid-invoices",
                element: null,
              },
            ]
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
              },
              {
                path: 'archived-stall-units',
                element: <ListStallUnits isArchived={true} />
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
                path: 'view-tenant/:id',
                element: <ViewTenant />
              },
              {
                path: 'create-tenant',
                element: <CreateTenant />
              },
              {
                path: 'assign-stall-unit',
                element: <AssignTenantToStall />
              },
              {
                path: 'archived-tenants',
                element: <ListTenants isArchived={true} />
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
