"use client";

import {
  primarySidebarItems,
  secondarySidebarItems,
} from "@/components/scholar/common/items";

const Navbar = ({ pathname }: { pathname: string }) => {
  let title = "";
  title =
    primarySidebarItems.find((item) => pathname.includes(item.href))?.label ||
    "";

  if (!title)
    title =
      secondarySidebarItems.find((item) => pathname.includes(item.href))
        ?.label || "";

  return (
    <header className="bg-white border-b border-[#E5E9EB] p-3 lg:px-8 sticky to-0 z-10">
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium text-[#252C32]">{title}</p>
      </div>
    </header>
  );
};

export default Navbar;
