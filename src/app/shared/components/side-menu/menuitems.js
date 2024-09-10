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
        path: "approval-queue",
      },
      {
        title: "Archived Accounts",
        path: "archived-accounts",
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
        path: "ledger",
      },
    ],
  },
  {
    title: "Reports",
    // path: "reports",
    icon: <HiOutlineDocumentReport style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "Rental Income",
        path: "rental-income",
      },
      {
        title: "Unpaid Invoices",
        path: "unpaid-invoices",
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
        path: "approval-queue",
      },
      {
        title: "Archived Accounts",
        path: "archived-accounts",
      },
    ],
  },
  {
    title: "Stall Units",
    path: "stall-units",
    icon: <HiOutlineBuildingStorefront style={{ color: "#128b31" }} />,
  },
  {
    title: "Tenants",
    path: "tenants",
    icon: <HiOutlineBuildingStorefront style={{ color: "#128b31" }} />,
    children: [
      {
        title: "View Tenants",
        path: "tenants"
      },
      {
        title: "Register Tenant",
        path: "create-tenant",
      },
      {
        title: "Assign Stall Unit",
        path: "assign-stall-unit",
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
        title: "All Invoices",
        path: "all-invoices",
      },
      {
        title: "Ledger",
        path: "ledger",
      },
    ],
  },
  {
    title: "Reports",
    // path: "reports",
    icon: <HiOutlineDocumentReport style={{ color: "#128b31" }} />,
    showDropDown: false,
    children: [
      {
        title: "Rental Income",
        path: "rental-income",
      },
      {
        title: "Unpaid Invoices",
        path: "unpaid-invoices",
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

    default:
      menuItems = adminMenuItems
      break;
  }
  return {
    menuItems
  };
}

