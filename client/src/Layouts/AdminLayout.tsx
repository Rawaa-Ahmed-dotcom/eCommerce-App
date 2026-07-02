import { NavLink, Outlet } from "react-router";

import { activeClassAdmin } from "../utils/CustomClasses";
import { AdminMenu } from "../utils/maps";

const AdminLayout = () => {
  return (
    <main className="flex! w-full min-h-screen">
      <aside className="w-[calc(100% / 3)]  bg-[#EAF5FA] border border-[#C0C8C7] px-6 py-12">
        <h2 className="capitalize font-bold text-2xl text-[#31D21] mb-6">
          Admin Dashboard
        </h2>
        <ul className="flex flex-col gap-3.5">
          {AdminMenu.map((item) => (
            <li key = {item.icon}>
              <NavLink
                to={`${item.to}`}
                end = {item.to === ""}
                className={({ isActive }: { isActive: boolean }) =>
                  activeClassAdmin(isActive)
                }
                
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <section className="w-[calc((100% / 3) * 2)] h-full">
      <Outlet/>
      </section>
    </main>
  );
};

export default AdminLayout;
