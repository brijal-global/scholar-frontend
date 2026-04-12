"use client";

import { useAuth } from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { ClipboardCheck, CalendarDays } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";

export default function AttendancePage() {
  const { userData } = useAuth();
  const userId = userData?.id;

  const { data: attendanceData, loading } = useFetch(
    userId
      ? `/attendances?conditions=${JSON.stringify({ userId })}&fields=id,userId,dateTime,createdAt&limit=100`
      : "",
    { now: !!userId }
  ) as any;

  const records =
    attendanceData?.rows || (Array.isArray(attendanceData) ? attendanceData : []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your attendance records
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm px-5 py-3 border border-gray-100">
          <p className="text-2xl font-semibold text-primary">{records.length}</p>
          <p className="text-xs text-gray-500">Total Present</p>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <ClipboardCheck className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No attendance records</p>
          <p className="text-sm mt-1">Your attendance will appear here once recorded.</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">#</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record: any, index: number) => {
                const dt = record.dateTime ? new Date(record.dateTime) : null;
                return (
                  <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        {dt ? formatDate(dt, "long") : "—"}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {dt
                        ? dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Present
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
