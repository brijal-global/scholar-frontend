import {
  BadgeDollarSign,
  Database,
  HouseIcon,
  School,
  Settings,
} from "lucide-react";

export const primarySidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: HouseIcon,
    href: "/scholar/dashboard",
  },
  {
    id: "colleges",
    label: "Colleges",
    icon: School,
    href: "/scholar/colleges",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    icon: BadgeDollarSign,
    href: "/scholar/inquiries",
  },
  {
    id: "modules",
    label: "Modules",
    icon: Database,
    href: "/scholar/modules",
  },
];

export const secondarySidebarItems = [
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/scholar/settings",
  },
];
