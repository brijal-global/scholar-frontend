"use client";

import Header from "@/components/admin/dashboard/Header";
import Chart from "@/components/admin/dashboard/Applications";
import Stats from "@/components/admin/dashboard/Stats";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <Stats />
      {/* Students Applications */}
      <Chart />
    </div>
  );
}
