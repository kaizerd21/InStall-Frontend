import { Outlet } from "react-router-dom";

import Header from "../../shared/components/header/header";
import SideMenu from "../../shared/components/side-menu/side-menu";

export function AuthShell() {
  return (
    <div id="AuthShell" className="h-screen flex">
      <div className="sm:w-1/6">
        <SideMenu />
      </div>
      <div className="flex-1 flex flex-col bg-inputfield_color h-full">
        <Header />
        <div className="h-full py-5 px-10 relative overflow-y-scroll"> {/* make relative for modal */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
