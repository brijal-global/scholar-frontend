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
    href: "/admin/dashboard",
  },
  {
    id: "universities",
    label: "Universities",
    icon: School,
    href: "/admin/universities",
  },
  {
    id: "program",
    label: "Program",
    icon: BookOpen,
    href: "/admin/program",
  },
  {
    id: "students",
    label: "Students",
    icon: GraduationCap,
    href: "/admin/students",
  },
  {
    id: "consultancy",
    label: "Consultancy",
    icon: GraduationCap,
    href: "/admin/consultancy",
  },
  {
    id: "applications",
    label: "Apllications",
    icon: FileUser,
    href: "/admin/applications",
  },
  {
    id: "payments",
    label: "Payments",
    icon: BadgeDollarSign,
    href: "/admin/payments",
  },
  {
    id: "userManagement",
    label: "User Management",
    icon: GraduationCap,
    href: "/admin/user-management",
  },
  {
    id: "masterData",
    label: "Master Data",
    type: "group",
    icon: Database,
    href: "/admin/master-data",
    children: [
      {
        id: "Educational Data",
        label: "Educational Data",
        href: "/admin/master-data",
      },
      {
        id: "Visa Documents",
        label: "Visa Documents",
        href: "/admin/master-data",
      },
      {
        id: "Language",
        label: "Language",
        href: "/admin/master-data",
      },
      {
        id: "Financial",
        label: "Financial",
        href: "/admin/master-data",
      },
      {
        id: "Visa Denial",
        label: "Visa Denial",
        href: "/admin/master-data",
      },
    ],
  },
];

export const secondarySidebarItems = [
  {
    id: "help-support",
    label: "Help & Support",
    icon: HeartHandshake,
    href: "/admin/support",
  },
];
