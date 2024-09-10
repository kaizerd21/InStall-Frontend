import { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Outlet, useNavigate } from "react-router-dom"

export function MainShell() {
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      navigate(`/management`)
    }
    else {
      navigate(`login`)
    }
  }, [navigate])

  return (
    <div id="MainShell">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  )
}
