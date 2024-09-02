import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/header/header";
import SideMenu from "../../components/sideMenu/sideMenu";

export default function ControlPageBase() {
  return (
    <div className="h-screen flex">
      <SideMenu className={"w-[15%] bg-white"} />
      <div className="flex-1 bg-background_secondary">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
}
