import { Outlet } from "react-router-dom";
import { AccountsProvider } from "./accounts-context/accounts.context";

export const statusDropdown = [
  { title: "Active", value: 'active' },
  { title: "Inactive", value: 'inactive' }
]

export const userTypes = [
  {
    title: "Administrator",
    value: "admin"
  },
  {
    title: "Audit Clerk",
    value: "audit-clerk"
  },
  {
    title: "Accounting Clerk",
    value: "accounting-clerk"
  },
  // {
  //   title: "Tenant",
  //   value: "tenant"
  // },
]

export default function Accounts() {
  return (
    <div id="Accounts" className="accounts">
      <h1 className="text-3xl font-bold">Accounts</h1>
      <AccountsProvider>
        <Outlet />
      </AccountsProvider>
    </div>
  )
}
