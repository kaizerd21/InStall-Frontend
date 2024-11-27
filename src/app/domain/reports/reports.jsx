import { Outlet } from "react-router-dom";
import { ReportsProvider } from "./reports-context/reports.context";


export default function Reports() {
  return (
    <div id="Reports" className="reports">
      <h1 className="text-3xl font-bold">Reports</h1>
      <ReportsProvider>
        <Outlet />
      </ReportsProvider>
    </div>
  )
}
