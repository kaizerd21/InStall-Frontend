import { createContext, useContext } from "react";


const InvoicesContext = createContext()

export function useMainElectricityContext() {
  return useContext(InvoicesContext)
}

export function InvoicesProvider({ children }) {
  return (
    <InvoicesContext.Provider value={useMainElectricityContext()}>
      {children}
    </InvoicesContext.Provider>
  )
}


