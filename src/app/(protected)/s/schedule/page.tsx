"use client";

import { useStudent } from "@/contexts/StudentContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Calendar, Clock, BookOpen, RefreshCw } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";

export default function SchedulePage() {
  const { groupId, loading: ctxLoading } = useStudent();

  const { data: classesData, loading: classesLoading } = useFetch(
    groupId
      ? `/classes?conditions=${JSON.stringify({ groupId })}&fields=id,moduleId,groupId,date,startTime,endTime,isWeekly&limit=100`
      : "",
    { now: !!groupId }
  ) as any;

  const classes =
    classesData?.rows || (Array.isArray(classesData) ? classesData : []);

  if (ctxLoading || classesLoading) return <Loader />;

  if (!groupId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Calendar className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No group assigned</p>
        <p className="text-sm mt-1">Contact your administrator to be assigned to a group.</p>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Calendar className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No classes scheduled</p>
        <p className="text-sm mt-1">Your schedule will appear here once classes are set up.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Class Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">
          {classes.length} class{classes.length !== 1 ? "es" : ""} scheduled
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((cls: any) => (
          <div
            key={cls.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary-light">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {cls.moduleId}
                </span>
              </div>
              {cls.isWeekly && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                  <RefreshCw className="w-3 h-3" />
                  Weekly
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              {cls.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(cls.date, "long")}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>
                  {cls.startTime || "—"} – {cls.endTime || "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
