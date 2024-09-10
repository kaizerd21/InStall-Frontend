import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authHeaders } from "./query/auth-headers";
import { AuthFunctions } from "./query/login-query";

export function useAxiosInstance() {
  const navigate = useNavigate()

  const { handleLogout } = AuthFunctions()

  const customAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    ...authHeaders()
  });

  customAxiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        handleLogout()
      }
    }
  )

  return {
    customAxiosInstance
  }
}
