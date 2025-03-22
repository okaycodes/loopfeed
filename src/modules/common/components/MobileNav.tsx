import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import SideNav from "./SideNav";
import FeedFilter from "@/modules/feed/components/FeedFilter";
import { FeedApiData } from "@/modules/feed/types";

export default function MobileNav({ filterResults }: { filterResults: FeedApiData[] }) {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [openMenu]);

  const mainClass = `w-full h-full max-h-full bg-white fixed top-0 z-10 transition-all duration-200 ease-in-out md:hidden ${
    openMenu ? "delay-100 left-[0%]" : "delay-200 -left-[100%]"
  } `;

  return (
    <div className="md:hidden">
      <div className="cursor-pointer" onClick={() => setOpenMenu(true)}>
        <BiMenu
          onClick={() => setOpenMenu(true)}
          className="w-[40px] transition duration-700 ease-in-out md:hidden block h-[40px] text-gray-600"
        />
      </div>
      <div className={mainClass}>
        <div className="relative h-full flex flex-col justify-between overflow-auto">
          <div className="grow shrink h-max">
            <div className="grow-0 shrink-0 basis-0 flex justify-end mb-4 py-4">
              <FaXmark
                onClick={() => setOpenMenu(false)}
                className="w-[40px] transition duration-700 ease-in-out md:hidden block h-[40px] text-gray-500"
              />
            </div>
          </div>
          <SideNav />
          <div className="pl-dashboard">
            <FeedFilter showFilter filterResults={filterResults} />
          </div>
        </div>
      </div>
    </div>
  );
}
