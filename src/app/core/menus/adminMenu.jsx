import { Badge } from "primereact/badge";

const itemRenderer = (item, options) => (
  <a
    className="flex items-center px-4 py-4 cursor-pointer text-xl"
    // onClick={options.onClick}
    href={item.url}
  >
    <span className={`${item.icon} text-background_color text-2xl`} />
    <span className={`mx-2`}>{item.label}</span>
    {item.badge && <Badge className="ml-auto" value={item.badge} />}
    {item.shortcut && (
      <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
        {item.shortcut}
      </span>
    )}
  </a>
);

const menuItem = (item, options) => (
  <a
    className="flex items-center px-4 py-4 cursor-pointer text-xl"
    // onClick={options.onClick}
    href={item.url}
  >
    <span className={`${item.icon} text-background_color text-2xl ml-5`} />
    <span className={`mx-2mib{item.label`}>{item.label}</span>
    {item.badge && <Badge className="ml-auto" value={item.badge} />}
    {item.shortcut && (
      <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
        {item.shortcut}
      </span>
    )}
  </a>
);

export const AdminMenu = [
  {
    url: "/admin/dashboard",
    label: "Dashboard",
    icon: "pi pi-objects-column",
    template: itemRenderer,
  },
  {
    // url: "/admin/stall-units",
    label: "Stall Units",
    icon: "pi pi-shop",
    template: itemRenderer,
    items: [
      {
        url: "/admin/create-stall-unit",
        label: "Create Stall Unit",
        template: menuItem,
      },
      {
        url: "/admin/view-stall-units",
        label: "View Stall Units",
        template: menuItem,
      },
      {
        url: "/admin/archived-stall-units",
        label: "Archived Stall Units",
        template: menuItem,
      },
    ],
  },
  {
    // url: "/admin/tenants",
    label: "Tenants",
    icon: "pi pi-users",
    template: itemRenderer,
    items: [
      {
        url: "/admin/register-tenant",
        label: "Register Tenant",
        template: menuItem,
      },
      {
        url: "/admin/assign-stall-unit",
        label: "Assign Stall Unit",
        template: menuItem,
      },
      {
        url: "/admin/view-tenants",
        label: "View Tenants",
        template: menuItem,
      },
      {
        url: "/admin/archived-tenants",
        label: "Archived Tenants",
        template: menuItem,
      },
    ],
  },
  {
    // url: "/admin/billings",
    label: "Billings",
    icon: "pi pi-calculator",
    template: itemRenderer,
    items: [
      {
        url: "/admin/electricity",
        label: "Electricity",
        template: menuItem,
      },
      {
        url: "/admin/create-invoice",
        label: "Create Invoice",
        template: menuItem,
      },
      {
        url: "/admin/view-invoices",
        label: "View Invoices",
        template: menuItem,
      },
      {
        url: "/admin/archive-invoices",
        label: "Archive Invoices",
        template: menuItem,
      },
      {
        url: "/admin/ledger",
        label: "Ledger",
        template: menuItem,
      },
    ],
  },
  {
    // url: "/admin/reports",
    label: "Reports",
    icon: "pi pi-chart-bar",
    template: itemRenderer,
    items: [
      {
        url: "/admin/rental-income",
        label: "Rental Income",
        template: menuItem,
      },
      {
        url: "/admin/unpaid-invoices",
        label: "Unpaid Invoices",
        template: menuItem,
      },
    ],
  },
];
