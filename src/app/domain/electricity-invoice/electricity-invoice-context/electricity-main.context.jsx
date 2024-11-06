import { createContext, useContext } from "react";
import { useMainElectricity } from "./electricity-main.hook";


const MainElectricityContext = createContext()

export function useMainElectricityContext() {
  return useContext(MainElectricityContext)
}

export function MainElectricityProvider({ children }) {
  return (
    <MainElectricityContext.Provider value={useMainElectricityContext()}>
      {children}
    </MainElectricityContext.Provider>
  )
}


