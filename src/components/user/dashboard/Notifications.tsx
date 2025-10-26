/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Notifications = ({ notificationList }: { notificationList: any[] }) => {
  return (
    <div className="flex-1 bg-[#F6F6F6] border-1 border-[#EBEBEB] rounded-lg p-6 max-h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-semibold text-blackish">
          Notifications and activities
        </h2>
        <Link
          href={"#"}
          className="text-[#838383] text-sm hover:text-grayish transition-all"
        >
          See all
        </Link>
      </div>

      <div className="space-y-4 w-full overflow-y-auto no-scrollbar">
        {notificationList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-lg p-3 w-full"
          >
            <div className="flex space-x-3 w-full items-start">
              <div className="w-12 h-12 rounded-lg flex justify-center overflow-hidden border-1 border-[#EBEBEB] bg-white">
                <Image
                  src={item?.imageURL}
                  alt="University Icon"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blackish text-base line-clamp-1">
                  {item?.universityName}
                </h3>
                <p className="text-xs text-[#838383] line-clamp-2">
                  {item?.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
