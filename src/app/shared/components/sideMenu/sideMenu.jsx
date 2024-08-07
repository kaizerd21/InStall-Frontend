import { PanelMenu } from "primereact/panelmenu";
import Logo from "../../../../assets/img/logo_only.png";
import { AdminMenu } from "../../../core/menus/adminMenu";

import "./sideMenu.scss";

export default function SideMenu({ className }) {
  return (
    <div className={className}>
      <div className="flex justify-center align-middle bg-background_color h-28 shadow-inner p-4">
        <div className="flex w-[80%]">
          <img src={Logo} alt="InStall Logo" className="h-full" />
          <div className="flex flex-col justify-center text-primary_text px-2 text-center">
            <h1 className="text-4xl font-extrabold">InStall</h1>
            <p className="text-[0.6em] text-wrap">
              Stall Rental Management System
            </p>
          </div>
        </div>
      </div>
      <div>
        <PanelMenu className="right-arrow-panelmenu" model={AdminMenu} />
      </div>
    </div>
  );
}
