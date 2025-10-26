import {
  FileText,
  FileUser,
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
    href: "/dashboard",
  },
  {
    id: "universities",
    label: "Universities",
    icon: School,
    href: "/universities",
  },
  {
    id: "applications",
    label: "My Applications",
    icon: FileUser,
    href: "/applications",
  },
  { id: "documents", label: "Documents", icon: FileText, href: "/documents" },
  { id: "setting", label: "Settings", icon: Settings, href: "/settings" },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    href: "/profile-setting",
  },
  {
    id: "profile-setup",
    label: "Profile Setup",
    icon: UserCheck2Icon,
    href: "/profile-setup",
  },
];

export const secondarySidebarItems = [
  {
    id: "help-support",
    label: "Help & Support",
    icon: HeartHandshake,
    href: "/support",
  },
];
