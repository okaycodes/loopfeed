import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main className="relative flex min-h-screen">
      <div className="hidden md:block">
        <SideNav />
      </div>

      <section className="pt-6 md:pt-0 flex flex-col h-full md:px-6 mx-auto w-11/12 ">
        <Outlet />
      </section>
    </main>
  );
}
