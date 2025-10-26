import buildingIllustration from "@/assets/illustrations/building.svg";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="relative overflow-hidden col-span-1 lg:col-span-3 flex justify-between items-center bg-gradient-to-r from-[#F9F9F9] to-[#F2F2F2] border border-[#EBEBEB] rounded-lg p-6 xl:p-20">
        <div className="flex-1 relative md:z-10">
          <h1 className="text-3xl font-medium text-blackish mb-1">
            Welcome Back, Consultant! 👋
          </h1>
          <p className="text-[#838383] text-sm">
            You&apos;re one step closer to beginning your journey to Korea with
            our guidance.
          </p>
        </div>

        <Image
          src={buildingIllustration}
          alt="Building Illustration"
          width={400}
          height={400}
          className="absolute bottom-0 right-0 object-cover hidden xl:block"
        />
      </div>
    </div>
  );
};

export default Header;
