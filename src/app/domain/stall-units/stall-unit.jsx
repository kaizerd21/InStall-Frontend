import { Outlet } from "react-router-dom";
import { AccountsProvider } from "../accounts/accounts-context/accounts.context";
import { StallUnitsProvider } from "./stall-unit-context/stall-units-context";

export function StallUnits() {
  return (
    <div id="Stall-Units">
      <h1 className="text-3xl font-bold">Stall Units</h1>
      <AccountsProvider>
        <StallUnitsProvider>
          <Outlet />
        </StallUnitsProvider>
      </AccountsProvider>
    </div>
  )
}
