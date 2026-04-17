/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import {
  GraduationCap,
  Layers,
  Users,
  BookOpen,
  FileText,
  UserCog,
  ArrowRight,
} from "lucide-react";

function StatCard({
  title,
  icon: Icon,
  count,
  loading,
  href,
}: {
  title: string;
  icon: any;
  count: number;
  loading: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary-light">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
      <p className="text-2xl font-semibold text-gray-900">
        {loading ? "..." : count}
      </p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </Link>
  );
}

export default function OrgDashboard() {
  const { collegeId, collegeName, collegeData, loading: orgLoading } = useOrg();

  const conditions = JSON.stringify({ collegeId });

  const { data: programsData, loading: l1 } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=999999&conditions=${conditions}`
      : "",
    { now: !!collegeId },
  ) as any;

  const { data: batchesData, loading: l2 } = useFetch(
    collegeId
      ? `/batches?fields=id&limit=999999&joinConditions=${JSON.stringify({ program: { collegeId } })}`
      : "",
    { now: !!collegeId },
  ) as any;

  const { data: studentsData, loading: l3 } = useFetch(
    collegeId ? `/student-details?fields=id&limit=1` : "",
    { now: !!collegeId },
  ) as any;

  const { data: modulesData, loading: l4 } = useFetch(
    collegeId
      ? `/modules?fields=id&limit=999999&joinConditions=${JSON.stringify({ program: { collegeId } })}`
      : "",
    { now: !!collegeId },
  ) as any;

  const { data: examsData, loading: l5 } = useFetch(
    collegeId
      ? `/exams?fields=id&limit=999999&joinConditions=${JSON.stringify({ program: { collegeId } })}`
      : "",
    { now: !!collegeId },
  ) as any;

  const { data: employeesData, loading: l6 } = useFetch(
    collegeId
      ? `/organization-employees?fields=id&limit=999999&conditions=${conditions}`
      : "",
    { now: !!collegeId },
  ) as any;

  const getCount = (data: any) =>
    data?.count ?? data?.totalRows ?? (Array.isArray(data) ? data.length : 0);

  if (orgLoading) return <Loader />;

  const stats = [
    {
      title: "Total Programs",
      icon: GraduationCap,
      count: getCount(programsData),
      loading: l1,
      href: "/org/programs",
    },
    {
      title: "Total Batches",
      icon: Layers,
      count: getCount(batchesData),
      loading: l2,
      href: "/org/batches",
    },
    {
      title: "Total Students",
      icon: Users,
      count: getCount(studentsData),
      loading: l3,
      href: "/org/students",
    },
    {
      title: "Total Courses",
      icon: BookOpen,
      count: getCount(modulesData),
      loading: l4,
      href: "/org/courses",
    },
    {
      title: "Total Exams",
      icon: FileText,
      count: getCount(examsData),
      loading: l5,
      href: "/org/exams",
    },
    {
      title: "Total Employees",
      icon: UserCog,
      count: getCount(employeesData),
      loading: l6,
      href: "/org/employees",
    },
  ];

  const quickActions = [
    { label: "Manage Programs", href: "/org/programs", icon: GraduationCap },
    { label: "Manage Batches", href: "/org/batches", icon: Layers },
    { label: "Manage Groups", href: "/org/groups", icon: Users },
    { label: "Manage Courses", href: "/org/courses", icon: BookOpen },
    { label: "Take Attendance", href: "/org/attendance", icon: Users },
    { label: "Manage Exams", href: "/org/exams", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {collegeName || "College Dashboard"}
        </h1>
        {collegeData && (
          <p className="text-sm text-gray-500 mt-1">
            {collegeData.city && `${collegeData.city}, `}
            {collegeData.country} &middot;{" "}
            {collegeData.collegeType || "Institution"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light transition-all text-sm text-gray-700 hover:text-primary"
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
