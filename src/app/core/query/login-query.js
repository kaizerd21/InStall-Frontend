import { useNavigate } from "react-router-dom"

export function AuthFunctions() {
  const navigate = useNavigate()
  const handleLogin = async () => {
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    console.log("handleLogout")
    navigate('/login')
  }
  return {
    handleLogin,
    handleLogout
  }
}

