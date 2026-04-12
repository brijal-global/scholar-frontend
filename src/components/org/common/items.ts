import {
  HouseIcon,
  GraduationCap,
  Layers,
  Users,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  Award,
  MessageSquare,
  Shield,
  UserCog,
  HeartHandshake,
} from "lucide-react";

export const primaryOrgSidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: HouseIcon, href: "/org/dashboard" },
  { id: "programs", label: "Programs", icon: GraduationCap, href: "/org/programs" },
  { id: "batches", label: "Batches", icon: Layers, href: "/org/batches" },
  { id: "groups", label: "Groups", icon: Users, href: "/org/groups" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/org/courses" },
  { id: "classes", label: "Classes", icon: Calendar, href: "/org/classes" },
  { id: "students", label: "Students", icon: Users, href: "/org/students" },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck, href: "/org/attendance" },
  { id: "exams", label: "Exams", icon: FileText, href: "/org/exams" },
  { id: "results", label: "Results", icon: Award, href: "/org/results" },
  { id: "remarks", label: "Remarks", icon: MessageSquare, href: "/org/remarks" },
  { id: "employees", label: "Employees", icon: UserCog, href: "/org/employees" },
  { id: "roles", label: "Role Groups", icon: Shield, href: "/org/roles" },
];

export const secondaryOrgSidebarItems = [
  { id: "support", label: "Help & Support", icon: HeartHandshake, href: "/org/support" },
];
