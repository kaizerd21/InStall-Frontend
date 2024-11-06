import { Outlet } from "react-router-dom";
import { MainElectricityProvider } from "../electricity-invoice/electricity-invoice-context/electricity-main.context";
import { InvoicesProvider } from "./invoice-context/invoice.context";

export default function Invoices() {
  return (
    <div id="Accounts" className="accounts">
      <h1 className="text-3xl font-bold">Invoices</h1>
      <InvoicesProvider>
        <MainElectricityProvider>
          <Outlet />
        </MainElectricityProvider>
      </InvoicesProvider>
    </div>
  )
}
