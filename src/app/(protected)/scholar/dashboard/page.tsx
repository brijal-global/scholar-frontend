/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useFetch from "@/hooks/useFetch";
import { School, MessageSquare, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/ui/Loader";

const statConfig = [
  {
    label: "Total Colleges",
    icon: School,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Active Inquiries",
    icon: MessageSquare,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const quickActions = [
  { label: "Create College", href: "/scholar/colleges/new", icon: Plus },
  { label: "View Inquiries", href: "/scholar/inquiries", icon: ArrowRight },
];

const Dashboard = () => {
  const { response: collegesRes, loading: collegesLoading } = useFetch(
    "/colleges?fields=id&limit=1",
  ) as any;

  const { response: inquiriesRes, loading: inquiriesLoading } = useFetch(
    "/inquiries?fields=id&limit=1",
  ) as any;

  const isLoading = collegesLoading || inquiriesLoading;

  const counts = [
    collegesRes?.pagination?.totalCount ?? 0,
    inquiriesRes?.pagination?.totalCount ?? 0,
  ];

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4"
            >
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {counts[index]}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p>No recent activity</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
