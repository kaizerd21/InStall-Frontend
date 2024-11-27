import { createContext, useContext } from "react";


const ReportsContext = createContext()

export function useReportsContext() {
  return useContext(ReportsContext)
}

export function ReportsProvider({ children }) {
  return (
    <ReportsContext.Provider value={useReportsContext()}>
      {children}
    </ReportsContext.Provider>
  )
}
