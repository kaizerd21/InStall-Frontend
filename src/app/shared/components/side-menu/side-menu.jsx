import { NavLink } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import { getMenuItems } from './menuitems'

import './side-menu.css'

export default function SideMenu() {
  const user = JSON.parse(localStorage.getItem('user'))
  const { menuItems } = getMenuItems(user.userType)


  return (
    <div className="flex flex-col items-center h-full shadow-lg">
      <div className="flex justify-center items-center bg-background_color h-28 w-full">
        Logo
      </div>
      <div className="w-full">
        <h2 className="pt-2 pl-5 text-sm text-gray-500 flex-1">
          NAVIGATION MENU
        </h2>
        <div className="space-y-1">
          {menuItems.map((menuItem) => (
            <div key={menuItem.path} id={menuItem.path}>
              <NavLink
                to={menuItem.path}
                className="py-2 px-5 flex justify-between items-center text-2xl"
              >
                <div className="flex items-center space-x-2">
                  {menuItem.icon}
                  <h1>{menuItem.title}</h1>
                </div>
                {menuItem.children ? (
                  <IoIosArrowForward style={{ color: "#128b31" }} />
                ) : null}
              </NavLink>
              {menuItem.children ? (
                <div className="flex flex-col">
                  {menuItem.children?.map((subMenu) => (
                    <NavLink
                      to={subMenu.path}
                      key={subMenu.path}
                      className={({ isActive, isPending }) =>
                        `${isActive ? "bg-green-200" : ""} hover:bg-green-200 py-2 px-5`
                      }
                    >
                      {subMenu.title}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
