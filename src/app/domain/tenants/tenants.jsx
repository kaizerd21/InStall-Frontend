import { Outlet } from "react-router-dom";
import { TenantsProvider } from "./tenants-context/tenants-context";


export function Tenants() {
  return (
    <div id="Tenants">
      <h1 className="text-3xl font-bold">Tenants</h1>
      <TenantsProvider>
        <Outlet />
      </TenantsProvider>
    </div>
  )
}
