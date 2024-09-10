import { useNavigate } from "react-router-dom"
import { useAxiosInstance } from "../../../core/main-api"
import { AuthFunctions } from "../../../core/query/login-query"


export const useAccounts = () => {
  const navigate = useNavigate()
  const { handleLogout } = AuthFunctions()

  const { customAxiosInstance } = useAxiosInstance()

  const handleCreateAccount = async (data) => {
    await customAxiosInstance.post(`/users/create-user`, data).then(res => {
      if (res.status === 201) {
        navigate(`/management/accounts`)
      }
      else if (res.status === 401) {
        handleLogout()
      }
    }).catch(err => alert(err))
  }

  return {
    handleCreateAccount,
  }
}
