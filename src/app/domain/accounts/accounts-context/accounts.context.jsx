import { createContext, useContext } from "react";
import { useAccounts } from "./accounts.hook";


const AccountsContext = createContext()

export function useAccountsContext() {
  return useContext(AccountsContext)
}

export function AccountsProvider({ children }) {
  return (
    <AccountsContext.Provider value={useAccounts()}>
      {children}
    </AccountsContext.Provider>
  )
}


