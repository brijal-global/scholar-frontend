"use client";

import Header from "@/components/consultancy/dashboard/Header";
import Applications from "@/components/consultancy/dashboard/Applications";
import Stats from "@/components/consultancy/dashboard/Stats";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <Stats />

      <div className="w-full flex flex-col lg:flex-row gap-6 ">
        {/* Students Applications */}
        <Applications />
      </div>
    </div>
  );
}
