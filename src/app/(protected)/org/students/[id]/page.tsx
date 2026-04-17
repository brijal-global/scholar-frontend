/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import fetchApi from "@/lib/axios";
import Loader from "@/components/ui/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
);

// ─── Colour palette ──────────────────────────────────────────────────────────
const COLORS = {
  primary: "#6366f1",
  primaryLight: "rgba(99,102,241,0.15)",
  success: "#22c55e",
  successLight: "rgba(34,197,94,0.15)",
  danger: "#ef4444",
  dangerLight: "rgba(239,68,68,0.15)",
  warning: "#f59e0b",
  warningLight: "rgba(245,158,11,0.15)",
  info: "#06b6d4",
  infoLight: "rgba(6,182,212,0.15)",
  purple: "#a855f7",
  purpleLight: "rgba(168,85,247,0.15)",
  gray: "#6b7280",
};

const MODULE_COLORS = [
  COLORS.primary,
  COLORS.success,
  COLORS.warning,
  COLORS.danger,
  COLORS.info,
  COLORS.purple,
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  color = "primary",
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: "primary" | "success" | "danger" | "warning" | "info";
  icon?: React.ReactNode;
}) {
  const colorMap = {
    primary: "bg-indigo-50 border-indigo-100 text-indigo-600",
    success: "bg-green-50 border-green-100 text-green-600",
    danger: "bg-red-50 border-red-100 text-red-600",
    warning: "bg-amber-50 border-amber-100 text-amber-600",
    info: "bg-cyan-50 border-cyan-100 text-cyan-600",
  };

  return (
    <div
      className={`rounded-xl border p-4 flex items-start gap-3 ${colorMap[color]}`}
    >
      {icon && <div className="text-xl mt-0.5">{icon}</div>}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide opacity-70">
          {label}
        </p>
        <p className="text-2xl font-bold mt-0.5">{value}</p>
        {sub && <p className="text-xs opacity-60 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {badge && (
          <span className="text-xs px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function TrendBadge({ trend }: { trend: string }) {
  const map: Record<string, { cls: string; label: string; icon: string }> = {
    improving: {
      cls: "bg-green-100 text-green-700",
      label: "Improving",
      icon: "↑",
    },
    declining: {
      cls: "bg-red-100 text-red-700",
      label: "Declining",
      icon: "↓",
    },
    stable: { cls: "bg-gray-100 text-gray-600", label: "Stable", icon: "→" },
  };
  const t = map[trend] || map.stable;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.cls}`}>
      {t.icon} {t.label}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase ${map[risk] || map.medium}`}
    >
      {risk} risk
    </span>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const cls =
    grade === "A+" || grade === "A"
      ? "bg-green-100 text-green-700"
      : grade === "B"
        ? "bg-blue-100 text-blue-700"
        : grade === "C"
          ? "bg-yellow-100 text-yellow-700"
          : grade === "D"
            ? "bg-orange-100 text-orange-700"
            : "bg-red-100 text-red-700";
  return (
    <span className={`text-sm px-3 py-1 rounded-lg font-bold ${cls}`}>
      {grade}
    </span>
  );
}

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { font: { size: 11 }, boxWidth: 12 },
    },
  },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetchApi(`/student-analytics/${id}`, {
        showErrorToast: false,
      });
      if (cancelled) return;
      if (res?.success === false || res?.error) {
        setError(res?.message || "Failed to load analytics");
      } else {
        setData(res?.data || res);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loader />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-gray-500">{error || "No analytics data found."}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-indigo-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const { student, attendance, examResults, remarks, overallPerformance } =
    data;

  // ── Attendance Chart Data ────────────────────────────────────────────────
  const attLabels = (attendance.monthlyBreakdown || []).map((m: any) => {
    const [year, month] = m.month.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
  });
  const attRates = (attendance.monthlyBreakdown || []).map((m: any) => m.rate);

  const attendanceChartData = {
    labels: attLabels,
    datasets: [
      {
        label: "Attendance %",
        data: attRates,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  // ── Exam Score Chart Data ────────────────────────────────────────────────
  const examLabels = (examResults.exams || [])
    .filter((e: any) => e.percentage !== null)
    .map((e: any) => e.examName?.slice(0, 20) || "Exam");
  const examScores = (examResults.exams || [])
    .filter((e: any) => e.percentage !== null)
    .map((e: any) => e.percentage);

  const examChartData = {
    labels: examLabels,
    datasets: [
      {
        label: "Score %",
        data: examScores,
        backgroundColor: examScores.map((s: number) =>
          s >= 60 ? COLORS.successLight : COLORS.dangerLight,
        ),
        borderColor: examScores.map((s: number) =>
          s >= 60 ? COLORS.success : COLORS.danger,
        ),
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  };

  // ── Module Radar Chart ────────────────────────────────────────────────────
  const modPerf = (examResults.modulePerformance || []).slice(0, 6);
  const radarData = {
    labels: modPerf.map((m: any) => m.moduleName?.slice(0, 15) || ""),
    datasets: [
      {
        label: "Score %",
        data: modPerf.map((m: any) => m.pct),
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
        borderWidth: 2,
        pointBackgroundColor: COLORS.primary,
      },
    ],
  };

  // ── Remarks Doughnut Chart ────────────────────────────────────────────────
  const remarkTypes = Object.keys(remarks.byType || {});
  const remarkCounts = Object.values(remarks.byType || {}) as number[];
  const remarkChartData = {
    labels: remarkTypes,
    datasets: [
      {
        data: remarkCounts,
        backgroundColor: MODULE_COLORS.slice(0, remarkTypes.length),
        borderWidth: 0,
      },
    ],
  };

  // ── Overall Score Arc ────────────────────────────────────────────────────
  const overallPct = overallPerformance.score;
  const overallDonut = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [overallPct, 100 - overallPct],
        backgroundColor: [
          overallPct >= 65 ? COLORS.success : overallPct >= 45 ? COLORS.warning : COLORS.danger,
          "#f3f4f6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const initials = [student.firstName?.[0], student.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        ← Back to Students
      </button>

      {/* ── Student Profile Card ──────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="shrink-0">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                {initials}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">
                {student.fullName}
              </h1>
              <RiskBadge risk={overallPerformance.risk} />
              <GradeBadge grade={overallPerformance.grade} />
            </div>
            <p className="text-sm text-gray-500 mt-1">{student.email}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-gray-500">
              {student.program?.name && (
                <span>
                  <span className="font-medium text-gray-700">Program:</span>{" "}
                  {student.program.name}
                </span>
              )}
              {student.batch?.name && (
                <span>
                  <span className="font-medium text-gray-700">Batch:</span>{" "}
                  {student.batch.name}
                </span>
              )}
              {student.group?.name && (
                <span>
                  <span className="font-medium text-gray-700">Group:</span>{" "}
                  {student.group.name}
                </span>
              )}
              {student.gender && (
                <span>
                  <span className="font-medium text-gray-700">Gender:</span>{" "}
                  {student.gender}
                </span>
              )}
              {student.phone && (
                <span>
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {student.phone}
                </span>
              )}
            </div>
          </div>

          {/* Overall Score Donut */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="w-24 h-24 relative">
              <Doughnut
                data={overallDonut}
                options={{
                  ...CHART_DEFAULTS,
                  cutout: "72%",
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-800">
                  {overallPct}
                </span>
                <span className="text-[10px] text-gray-400">/ 100</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Overall Score</p>
          </div>
        </div>
      </div>

      {/* ── KPI Row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Attendance Rate"
          value={`${attendance.attendanceRate}%`}
          sub={`${attendance.totalPresent} days present`}
          color={
            attendance.attendanceRate >= 75
              ? "success"
              : attendance.attendanceRate >= 60
                ? "warning"
                : "danger"
          }
          icon="📅"
        />
        <StatCard
          label="Avg Exam Score"
          value={`${examResults.avgScore}%`}
          sub={`${examResults.attemptedExams} exams taken`}
          color={
            examResults.avgScore >= 60
              ? "success"
              : examResults.avgScore >= 40
                ? "warning"
                : "danger"
          }
          icon="📝"
        />
        <StatCard
          label="Total Remarks"
          value={remarks.total}
          sub={`${remarks.positiveCount} positive · ${remarks.negativeCount} negative`}
          color="info"
          icon="💬"
        />
        <StatCard
          label="Current Streak"
          value={`${attendance.currentStreak}d`}
          sub={`Max: ${attendance.maxStreak} days`}
          color="primary"
          icon="🔥"
        />
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Attendance Line Chart */}
        <div className="lg:col-span-2">
          <SectionCard
            title="Monthly Attendance Trend"
            badge={`Trend: ${attendance.trend}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendBadge trend={attendance.trend} />
              <span className="text-xs text-gray-500">
                R² = {attendance.regression?.r2?.toFixed(2)} · Predicted next
                month:{" "}
                <strong className="text-indigo-600">
                  {attendance.predictedNextMonth}%
                </strong>
              </span>
            </div>
            <div className="h-56">
              {attLabels.length > 0 ? (
                <Line
                  data={attendanceChartData}
                  options={{
                    ...CHART_DEFAULTS,
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        ticks: { font: { size: 10 }, callback: (v) => `${v}%` },
                        grid: { color: "rgba(0,0,0,0.04)" },
                      },
                      x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                    },
                    plugins: {
                      ...CHART_DEFAULTS.plugins,
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.parsed.y}% present`,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No attendance data available
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Module Radar */}
        <SectionCard title="Module Performance">
          <div className="h-64">
            {modPerf.length > 0 ? (
              <Radar
                data={radarData}
                options={{
                  ...CHART_DEFAULTS,
                  scales: {
                    r: {
                      min: 0,
                      max: 100,
                      ticks: { font: { size: 9 }, stepSize: 25 },
                      pointLabels: { font: { size: 9 } },
                      grid: { color: "rgba(0,0,0,0.05)" },
                    },
                  },
                  plugins: { legend: { display: false } },
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No module data available
              </div>
            )}
          </div>
        </SectionCard>

        {/* Exam Bar Chart */}
        <div className="lg:col-span-2">
          <SectionCard
            title="Exam Results"
            badge={`Avg: ${examResults.avgScore}%`}
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendBadge trend={examResults.trend} />
              <span className="text-xs text-gray-500">
                Predicted next score:{" "}
                <strong className="text-indigo-600">
                  {examResults.predictedNextScore}%
                </strong>
              </span>
            </div>
            <div className="h-56">
              {examLabels.length > 0 ? (
                <Bar
                  data={examChartData}
                  options={{
                    ...CHART_DEFAULTS,
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        ticks: { font: { size: 10 }, callback: (v) => `${v}%` },
                        grid: { color: "rgba(0,0,0,0.04)" },
                      },
                      x: {
                        ticks: {
                          font: { size: 9 },
                          maxRotation: 30,
                          minRotation: 10,
                        },
                        grid: { display: false },
                      },
                    },
                    plugins: {
                      ...CHART_DEFAULTS.plugins,
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `Score: ${ctx.parsed.y}%`,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No exam data available
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Remarks Doughnut */}
        <SectionCard title="Remarks by Type">
          <div className="h-56">
            {remarkTypes.length > 0 ? (
              <Doughnut
                data={remarkChartData}
                options={{
                  ...CHART_DEFAULTS,
                  cutout: "55%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { font: { size: 10 }, boxWidth: 10 },
                    },
                  },
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No remarks data
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* ── Bottom Row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* AI Insights */}
        <SectionCard title="ML Performance Insights">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-gray-500">Attendance Regression R²</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round((attendance.regression?.r2 || 0) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-indigo-600 w-10">
                    {(attendance.regression?.r2 || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Exam Score Regression R²</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round((examResults.regression?.r2 || 0) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-purple-600 w-10">
                    {(examResults.regression?.r2 || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t pt-3 space-y-2">
              <p className="text-xs font-semibold text-gray-700">
                Insights & Recommendations
              </p>
              {(overallPerformance.insights || []).map(
                (insight: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className="mt-0.5 shrink-0 text-indigo-400">•</span>
                    <span>{insight}</span>
                  </div>
                ),
              )}
            </div>
            <div className="border-t pt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-gray-500">Attendance Slope</p>
                <p className="font-mono font-semibold">
                  {attendance.regression?.slope?.toFixed(3)}/month
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-gray-500">Exam Score Slope</p>
                <p className="font-mono font-semibold">
                  {examResults.regression?.slope?.toFixed(3)}/exam
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Recent Remarks */}
        <SectionCard title="Recent Remarks">
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {(remarks.recent || []).length === 0 && (
              <p className="text-sm text-gray-400">No remarks found.</p>
            )}
            {(remarks.recent || []).map((r: any) => {
              const typeColor: Record<string, string> = {
                academic: "bg-indigo-100 text-indigo-700",
                behavioral: "bg-red-100 text-red-700",
                attendance: "bg-amber-100 text-amber-700",
                participation: "bg-green-100 text-green-700",
                achievement: "bg-purple-100 text-purple-700",
              };
              return (
                <div
                  key={r.id}
                  className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColor[r.type] || "bg-gray-100 text-gray-600"}`}
                    >
                      {r.type}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(r.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-800">{r.subject}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {r.message}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    By {r.teacherName}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* ── Exam Details Table ────────────────────────────────────────────── */}
      {examResults.exams?.length > 0 && (
        <SectionCard title="Detailed Exam Results">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">
                    Exam
                  </th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">
                    Type
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    Score
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    %
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {examResults.exams.map((exam: any) => (
                  <tr
                    key={exam.examId}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-2.5 px-3 font-medium text-gray-800">
                      {exam.examName}
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 capitalize">
                      {exam.examType}
                    </td>
                    <td className="py-2.5 px-3 text-center text-gray-700">
                      {exam.percentage !== null
                        ? `${exam.obtainedTotal} / ${exam.maxTotal}`
                        : "—"}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {exam.percentage !== null ? (
                        <span
                          className={
                            exam.percentage >= 60
                              ? "text-green-600 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {exam.percentage}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <GradeBadge grade={exam.grade} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* ── Module Performance Table ──────────────────────────────────────── */}
      {examResults.modulePerformance?.length > 0 && (
        <SectionCard title="Performance by Module">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">
                    Module
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    Attempts
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    Avg Score
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    Avg Max
                  </th>
                  <th className="text-center py-2 px-3 text-gray-500 font-medium">
                    %
                  </th>
                  <th className="py-2 px-3 text-gray-500 font-medium">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...(examResults.modulePerformance || [])]
                  .sort((a: any, b: any) => b.pct - a.pct)
                  .map((mod: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-2.5 px-3 font-medium text-gray-800">
                        {mod.moduleName}
                      </td>
                      <td className="py-2.5 px-3 text-center text-gray-500">
                        {mod.attempts}
                      </td>
                      <td className="py-2.5 px-3 text-center text-gray-700">
                        {mod.avgScore}
                      </td>
                      <td className="py-2.5 px-3 text-center text-gray-500">
                        {mod.avgTotal}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={
                            mod.pct >= 60
                              ? "text-green-600 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {mod.pct}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 min-w-[120px]">
                        <div className="bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(100, mod.pct)}%`,
                              backgroundColor:
                                mod.pct >= 60 ? COLORS.success : COLORS.danger,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
