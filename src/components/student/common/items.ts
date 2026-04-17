import {
  HouseIcon,
  Calendar,
  ClipboardCheck,
  FileText,
  Award,
  TrendingUp,
  MessageSquare,
  HeartHandshake,
} from "lucide-react";

export const primaryStudentSidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: HouseIcon, href: "/s/dashboard" },
  { id: "schedule", label: "Schedule", icon: Calendar, href: "/s/schedule" },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck, href: "/s/attendance" },
  { id: "exams", label: "Exams", icon: FileText, href: "/s/exams" },
  { id: "results", label: "Results", icon: Award, href: "/s/results" },
  { id: "progress", label: "My Progress", icon: TrendingUp, href: "/s/my-progress" },
  { id: "remarks", label: "Remarks", icon: MessageSquare, href: "/s/remarks" },
];

export const secondaryStudentSidebarItems = [
  { id: "support", label: "Help & Support", icon: HeartHandshake, href: "/s/support" },
];
