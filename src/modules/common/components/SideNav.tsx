import HomeIcon from "@/assets/icons/home.icon";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function SideNav() {
  return (
    <aside className="fixed min-h-screen w-dashboard pt-24 space-y-5 bg-primary text-primary-light flex flex-col items-center">
      <NavItem to="/" title="Home" icon={<HomeIcon />} />
    </aside>
  );
}

export const NavItem = ({ title, icon, to }: { title: string; icon: ReactNode; to: string }) => {
  return (
    <Link className="flex flex-col items-center" to={to}>
      <div>{icon}</div>
      <p className="text-xs">{title}</p>
    </Link>
  );
};
