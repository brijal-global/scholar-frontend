import {
  BadgeDollarSign,
  BookOpen,
  Database,
  FileUser,
  GraduationCap,
  HeartHandshake,
  HouseIcon,
  School,
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
    id: "users",
    label: "Users",
    icon: BookOpen,
    href: "/scholar/users",
  },
  {
    id: "roles",
    label: "Roles",
    icon: GraduationCap,
    href: "/scholar/roles",
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: FileUser,
    href: "/scholar/permissions",
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
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: Database,
    href: "/scholar/subscriptions",
  },
];

export const secondarySidebarItems = [
  {
    id: "support",
    label: "Help & Support",
    icon: HeartHandshake,
    href: "/scholar/support",
  },
];
