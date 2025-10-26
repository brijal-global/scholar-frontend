import {
  BadgeDollarSign,
  FileUser,
  GraduationCap,
  HeartHandshake,
  HouseIcon,
  School,
  Settings,
  UserCheck2Icon,
  UserCircle,
} from "lucide-react";

export const primarySidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: HouseIcon,
    href: "/consultancy/dashboard",
  },
  {
    id: "universities",
    label: "Universities",
    icon: School,
    href: "/consultancy/universities",
  },
  {
    id: "applications",
    label: "Applications",
    icon: FileUser,
    href: "/consultancy/applications",
  },
  {
    id: "students",
    label: "Students",
    icon: GraduationCap,
    href: "/consultancy/students",
  },
  {
    id: "payments",
    label: "Payments",
    icon: BadgeDollarSign,
    href: "/consultancy/payments",
  },
  {
    id: "setting",
    label: "Settings",
    icon: Settings,
    href: "/consultancy/settings",
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    href: "/consultancy/profile-setting",
  },
  {
    id: "profile-setup",
    label: "Profile Setup",
    icon: UserCheck2Icon,
    href: "/consultancy/profile-setup",
  },
];

export const secondarySidebarItems = [
  {
    id: "help-support",
    label: "Help & Support",
    icon: HeartHandshake,
    href: "/consultancy/support",
  },
];
