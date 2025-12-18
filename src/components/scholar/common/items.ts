import {
  BadgeDollarSign,
  BookOpen,
  Database,
  GraduationCap,
  HeartHandshake,
  HouseIcon,
  School,
  ShieldCheck,
  User,
  Users,
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
  {
    id: "roles",
    label: "Roles",
    icon: ShieldCheck,
    href: "/scholar/roles",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/scholar/users",
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
