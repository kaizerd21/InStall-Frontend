import { Outlet } from "react-router-dom";
import { MainElectricityProvider } from "./electricity-invoice-context/electricity-main.context";

export default function MainElectricity() {
  return (
    <div id="Accounts" className="accounts">
      <h1 className="text-3xl font-bold">Invoices</h1>
      <MainElectricityProvider>
        <Outlet />
      </MainElectricityProvider>
    </div>
  )
}
