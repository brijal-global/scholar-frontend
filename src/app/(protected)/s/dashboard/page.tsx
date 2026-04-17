"use client";

import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import {
  Calendar,
  ClipboardCheck,
  Award,
  TrendingUp,
  Users,
  GraduationCap,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";

function InfoCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary-light">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <p className="text-lg font-medium text-gray-900">{value || "—"}</p>
    </div>
  );
}

function StatCard({
  title,
  count,
  loading,
  icon: Icon,
}: {
  title: string;
  count: number;
  loading: boolean;
  icon: any;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary-light">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900">
        {loading ? "..." : count}
      </p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  );
}

export default function StudentDashboard() {
  const { userData } = useAuth();
  const { studentId, studentData, groupId, programId, loading: ctxLoading } = useStudent();

  const { data: groupData } = useFetch(
    groupId ? `/groups/${groupId}` : "",
    { now: !!groupId }
  ) as any;

  const { data: programData } = useFetch(
    programId ? `/programs/${programId}` : "",
    { now: !!programId }
  ) as any;

  const { data: attendanceData, loading: attLoading } = useFetch(
    userData?.id
      ? `/attendances?fields=id&limit=1&conditions=${JSON.stringify({ userId: userData.id })}`
      : "",
    { now: !!userData?.id }
  ) as any;

  const { data: examsData, loading: examsLoading } = useFetch(
    programId
      ? `/exams?fields=id&limit=1&conditions=${JSON.stringify({ programId })}`
      : "",
    { now: !!programId }
  ) as any;

  const { data: remarksData, loading: remarksLoading } = useFetch(
    studentId
      ? `/student-remarks?fields=id&limit=1&conditions=${JSON.stringify({ studentId })}`
      : "",
    { now: !!studentId }
  ) as any;

  const getCount = (data: any) =>
    data?.count ?? data?.totalRows ?? (Array.isArray(data) ? data.length : 0);

  if (ctxLoading) return <Loader />;

  const quickLinks = [
    { label: "View Schedule", href: "/s/schedule", icon: Calendar },
    { label: "Check Attendance", href: "/s/attendance", icon: ClipboardCheck },
    { label: "View Results", href: "/s/results", icon: Award },
    { label: "My Progress", href: "/s/my-progress", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {userData?.firstName || "Student"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here&apos;s an overview of your academic profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          label="Group"
          value={groupData?.name || "—"}
          icon={Users}
        />
        <InfoCard
          label="Program"
          value={programData?.name || "—"}
          icon={GraduationCap}
        />
        <InfoCard
          label="Date of Birth"
          value={studentData?.dob ? formatDate(studentData.dob, "long") : "—"}
          icon={CalendarDays}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Attendance Records"
          count={getCount(attendanceData)}
          loading={attLoading}
          icon={ClipboardCheck}
        />
        <StatCard
          title="Total Exams"
          count={getCount(examsData)}
          loading={examsLoading}
          icon={Award}
        />
        <StatCard
          title="Remarks"
          count={getCount(remarksData)}
          loading={remarksLoading}
          icon={TrendingUp}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light transition-all text-sm text-gray-700 hover:text-primary group"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
              <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
