"use client";

import {
  Bell,
  ChevronRight,
  CircleQuestionMark,
  MessageSquare,
  User,
  X,
} from "lucide-react";
import {
  primarySidebarItems,
  secondarySidebarItems,
} from "@/components/scholar/common/items";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const Navbar = ({ pathname }: { pathname: string }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { userData } = useAuth();
  let title = "";
  title =
    primarySidebarItems.find((item) => pathname.includes(item.href))?.label ||
    "";

  if (!title)
    title =
      secondarySidebarItems.find((item) => pathname.includes(item.href))
        ?.label || "";
  const handleNotificationClicked = () => {
    setShowNotification((prev) => !prev);
  };

  const handleProfileClicked = () => {
    setShowUser((prev) => !prev);
  };

  const Notifications = [
    {
      id: "1",
      heading: "Yonsei University",
      notification: "Your application has been submitted successfully.",
      time: "Just now",
    },
  ];

  // useEffect to handle the function onClick on window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotification(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="bg-white border-b border-[#E5E9EB] p-3 lg:px-8 sticky to-0 z-10">
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium text-[#252C32]">{title}</p>
        <div className="flex flex-row items-center gap-4 text-[#5B6871] select-none">
          {/* <CircleQuestionMark
            className="inline cursor-pointer"
            color="#5B6871"
            size={18}
          /> */}
          {/* <div className="flex gap-1 items-center px-3 text-sm cursor-pointer">
            <MessageSquare className="inline" color="#5B6871" size={16} />
            Feedback?
          </div> */}
          {/* <Bell
            className="inline cursor-pointer"
            color="#5B6871"
            size={18}
            onClick={handleNotificationClicked}
          /> */}
          <User
            className="inline cursor-pointer"
            color="#5B6871"
            size={18}
            onClick={handleProfileClicked}
          />
        </div>
      </div>
      {showNotification && (
        <div
          ref={notificationRef}
          className="m-4 absolute top-8 right-0 bg-white border border-[#E5E9EB] p-4 flex flex-col space-y-2 py-2.5 px-4 rounded-lg duration-200 transition-all text-sm"
        >
          <div className="flex justify-between text-[#222529] font-medium">
            <p>Notifications</p>
            <X onClick={handleNotificationClicked} />
          </div>
          <hr className="text-[#E1E1E1]" />
          <ul>
            {Notifications.map((notification) => (
              <div
                ref={userRef}
                key={notification.id}
                className="flex space-x-2 items-center gap-2 py-2.5 px-4 rounded-lg duration-200 transition-all text-sm"
              >
                <div className="flex flex-col">
                  <p>{notification.heading}</p>
                  <p className="text-sm">{notification.notification}</p>
                </div>
                <Link href="#">
                  <ChevronRight />
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
      {showUser && (
        <div
          ref={userRef}
          className="m-4 text-[#838383] absolute top-8 right-0 w-64 bg-white border border-[#E5E9EB] p-4 flex flex-col space-y-2 mt-4 gap-2 py-2.5 px-4 rounded-lg duration-200 transition-all text-sm"
        >
          <div>
            <p className="text-[#252C32] font-medium">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="text-xs text-[#5B6871] text-ellipsis overflow-hidden whitespace-nowrap">
              {userData?.email}
            </p>
          </div>
          <hr className="text-[#E1E1E1]" />
          <Link href="/scholar/profile">Profile</Link>
          <Link href="/scholar/settings">Setting</Link>
          <hr className="text-[#E1E1E1]" />
          <Link href="/auth/sign-out" className="text-[#FF8787]">
            Logout{" "}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
