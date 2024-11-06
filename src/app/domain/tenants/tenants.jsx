import { Outlet } from "react-router-dom";
import { TenantsProvider } from "./tenants-context/tenants-context";


export function Tenants() {
  return (
    <div id="Tenants">
      <TenantsProvider>
        <Outlet />
      </TenantsProvider>
    </div>
  )
}
