import { createContext, useContext } from "react";
import { useTenants } from "./tenants-context.hook";


const TenantsContext = createContext()

export function useTenantsContext() {
  useContext(TenantsContext)
}

export function TenantsProvider({ children }) {
  return (
    <TenantsContext.Provider value={useTenants()}>
      {children}
    </TenantsContext.Provider>
  )
}
