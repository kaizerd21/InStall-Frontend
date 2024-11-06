import axios from "axios";
import { authHeaders } from "./query/auth-headers";
import { AuthFunctions } from "./query/login-query";

export const authToken = localStorage.getItem('authToken')

export const AUTH_HEADERS = {
  headers: {
    Authorization: `Bearer ${authToken}`
  },
}
export const BASE_URL = process.env.REACT_APP_BASE_URL

export function useAxiosInstance() {

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
