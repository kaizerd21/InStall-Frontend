import { LuLayoutDashboard } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { TbBusinessplan } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";

export const adminMenuItems = [
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard style={{ color: "#128b31" }} />,
  },
  {
    title: "Accounts",
    icon: <VscAccount style={{ color: "#128b31" }} />,
    path: "accounts",
    showDropDown: false,
    children: [
      {
        title: "Accounts",
        path: "accounts",
      },
      {
        title: "Approval Queue",
        path: "accounts/approval-queue",
      },
      {
        title: "Archived Accounts",
        path: "accounts/archived-accounts",
      },
    ],
  },
  {
    title: "Stall Units",
    path: "stall-units",
    icon: <HiOutlineBuildingStorefront style={{ color: "#128b31" }} />,
  },
  {
    title: "Billings",
    path: "all-invoices",
    icon: <TbBusinessplan style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "All Invoices",
        path: "all-invoices",
      },
      {
        title: "Ledger",
        path: "all-invoices/ledger",
      },
    ],
  },
  {
    title: "Reports",
    path: "rental-income",
    icon: <HiOutlineDocumentReport style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "Rental Income",
        path: "rental-income",
      },
      {
        title: "Unpaid Invoices",
        path: "rental-income/unpaid-invoices",
      },
    ],
  },
];

export const auditClerkMenuItems = [
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard style={{ color: "#128b31" }} />,
  },
  {
    title: "Stall Units",
    path: "stall-units",
    icon: <HiOutlineBuildingStorefront style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "Create Stall Unit",
        path: "stall-units/create-stall-unit",
      },
      {
        title: "View Stall Units",
        path: "stall-units",
      },
      {
        title: "Archived Stall Units",
        path: "stall-units/archived-stall-units",
      },
    ],
  },
  {
    title: "Tenants",
    path: "tenants",
    icon: <HiOutlineBuildingStorefront style={{ color: "#128b31" }} />,
    children: [
      {
        title: "Register Tenant",
        path: "tenants/create-tenant"
      },
      {
        title: "Assign Stall Unit",
        path: "tenants/assign-stall-unit",
      },
      {
        title: "View Tenants",
        path: "tenants"
      },
      {
        title: "Archived Tenants",
        path: "tenants/archived-tenants"
      },
    ]
  },
  {
    title: "Billings",
    path: "all-invoices",
    icon: <TbBusinessplan style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "Electricity",
        path: "all-invoices/main-electricity",
      },
      {
        title: "Create Invoice",
        path: "all-invoices/create-invoice",
      },
      {
        title: "View Invoices",
        path: "all-invoices/list-invoice",
      },
      {
        title: "Archived Invoices",
        path: "all-invoices/archived-invoices",
      },
      {
        title: "Ledger",
        path: "all-invoices/ledger",
      },
    ],
  },
  {
    title: "Reports",
    path: "rental-income",
    icon: <HiOutlineDocumentReport style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "Rental Income",
        path: "rental-income",
      },
      {
        title: "Unpaid Invoices",
        path: "rental-income/unpaid-invoices",
      },
    ],
  },
];

export const accountingClerkMenuItems = [
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard style={{ color: "#128b31" }} />,
  },
  {
    title: "Tenants",
    path: "tenants",
    icon: <HiOutlineBuildingStorefront style={{ color: "#128b31" }} />,
  },
  {
    title: "Billings",
    path: "all-invoices",
    icon: <TbBusinessplan style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "View Invoices",
        path: "all-invoices",
      },
      {
        title: "Pay Due Invoices",
        path: "all-invoices/pay-due-invoices",
      },
      {
        title: "Ledger",
        path: "all-invoices/ledger",
      },
    ],
  },
];

export const tenantMenuItems = [
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard style={{ color: "#128b31" }} />,
  },
  {
    title: "Billings",
    path: "all-invoices",
    icon: <TbBusinessplan style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "View Invoices",
        path: "all-invoices",
      },
      {
        title: "Ledger",
        path: "ledger",
      },
    ],
  },
];
export function getMenuItems(userType) {
  let menuItems;
  switch (userType) {
    case ('audit-clerk'):
      menuItems = auditClerkMenuItems;
      break;

    case ('accounting-clerk'):
      menuItems = accountingClerkMenuItems;
      break;

    case ('tenant'):
      menuItems = tenantMenuItems;
      break;

    default:
      menuItems = adminMenuItems
      break;
  }
  return {
    menuItems
  };
}

