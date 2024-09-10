import { createContext, useContext } from "react";
import { useStallUnits } from "./stall-units-context.hook";


const StallUnitsContext = createContext()

export function useStallUnitsContext() {
  return useContext(StallUnitsContext)
}

export function StallUnitsProvider({ children }) {
  return (
    <StallUnitsContext.Provider value={useStallUnits()}>
      {children}
    </StallUnitsContext.Provider>
  )
}
