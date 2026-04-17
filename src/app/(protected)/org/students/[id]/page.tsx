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
} from "chart.js";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import fetchApi from "@/lib/axios";
import Loader from "@/components/ui/Loader";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  BookOpen,
  MessageSquare,
  Flame,
  Award,
  Brain,
} from "lucide-react";

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
);

// ── Colours ───────────────────────────────────────────────────────────────────
const C = {
  indigo: "#6366f1",
  indigoLight: "rgba(99,102,241,0.12)",
  green: "#16a34a",
  greenLight: "rgba(22,163,74,0.12)",
  red: "#dc2626",
  redLight: "rgba(220,38,38,0.12)",
  amber: "#d97706",
  amberLight: "rgba(217,119,6,0.12)",
  cyan: "#0891b2",
  cyanLight: "rgba(8,145,178,0.12)",
  violet: "#7c3aed",
  violetLight: "rgba(124,58,237,0.12)",
};

const MODULE_PALETTE = [
  C.indigo, C.green, C.amber, C.red, C.cyan, C.violet,
];

// ── Tiny helpers ──────────────────────────────────────────────────────────────
function gradeColor(g: string) {
  if (g === "A+" || g === "A") return "text-green-700 bg-green-50 border-green-200";
  if (g === "B") return "text-blue-700 bg-blue-50 border-blue-200";
  if (g === "C") return "text-amber-700 bg-amber-50 border-amber-200";
  if (g === "D") return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function riskColors(r: string) {
  if (r === "low") return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", dot: "bg-green-500" };
  if (r === "medium") return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-500" };
  return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", dot: "bg-red-500" };
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "improving") return <TrendingUp size={14} className="text-green-600" />;
  if (trend === "declining") return <TrendingDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-gray-400" />;
}

function TrendPill({ trend }: { trend: string }) {
  const map: Record<string, string> = {
    improving: "bg-green-50 text-green-700 border border-green-200",
    declining: "bg-red-50 text-red-600 border border-red-200",
    stable: "bg-gray-100 text-gray-500 border border-gray-200",
  };
  const labels: Record<string, string> = { improving: "Improving", declining: "Declining", stable: "Stable" };
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${map[trend] || map.stable}`}>
      <TrendIcon trend={trend} />
      {labels[trend] || trend}
    </span>
  );
}

const CHART_OPT = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { labels: { font: { size: 10 }, boxWidth: 10 } } },
};

// ── Card shells ───────────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-50">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {right}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: any;
  label: string;
  value: string | number;
  sub?: string;
  accent: string; // tailwind bg class for icon bg
}) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide truncate">{label}</p>
        <p className="text-xl font-bold text-gray-900 leading-tight mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>}
      </div>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
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
      const res = await fetchApi(`/student-analytics/${id}`, { showErrorToast: false });
      if (cancelled) return;
      if (res?.success === false || res?.error) {
        setError(res?.message || "Failed to load analytics");
      } else {
        setData(res?.data || res);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <Loader />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-gray-500">{error || "No analytics data found."}</p>
        <button onClick={() => router.back()} className="text-sm text-indigo-600 underline">
          Go back
        </button>
      </div>
    );
  }

  const { student, attendance, examResults, remarks, overallPerformance } = data;

  // ── Chart datasets ────────────────────────────────────────────────────────
  const attLabels = (attendance.monthlyBreakdown || []).map((m: any) => {
    const [yr, mo] = m.month.split("-");
    return new Date(+yr, +mo - 1).toLocaleString("default", { month: "short", year: "2-digit" });
  });
  const attRates = (attendance.monthlyBreakdown || []).map((m: any) => m.rate);

  const attChartData = {
    labels: attLabels,
    datasets: [{
      label: "Attendance %",
      data: attRates,
      borderColor: C.indigo,
      backgroundColor: C.indigoLight,
      fill: true,
      tension: 0.45,
      pointRadius: 3,
      pointBackgroundColor: C.indigo,
    }],
  };

  const scoredExams = (examResults.exams || []).filter((e: any) => e.percentage !== null);
  const examChartData = {
    labels: scoredExams.map((e: any) => e.examName?.slice(0, 18) || "Exam"),
    datasets: [{
      label: "Score %",
      data: scoredExams.map((e: any) => e.percentage),
      backgroundColor: scoredExams.map((e: any) =>
        e.percentage >= 60 ? C.greenLight : C.redLight,
      ),
      borderColor: scoredExams.map((e: any) => e.percentage >= 60 ? C.green : C.red),
      borderWidth: 2,
      borderRadius: 6,
    }],
  };

  const modPerf = (examResults.modulePerformance || []).slice(0, 6);
  const radarData = {
    labels: modPerf.map((m: any) => m.moduleName?.slice(0, 12) || ""),
    datasets: [{
      label: "Score %",
      data: modPerf.map((m: any) => m.pct),
      backgroundColor: C.indigoLight,
      borderColor: C.indigo,
      borderWidth: 2,
      pointBackgroundColor: C.indigo,
      pointRadius: 4,
    }],
  };

  const remarkTypes = Object.keys(remarks.byType || {});
  const remarkDonut = {
    labels: remarkTypes,
    datasets: [{
      data: Object.values(remarks.byType || {}) as number[],
      backgroundColor: MODULE_PALETTE.slice(0, remarkTypes.length),
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const scoreColor =
    overallPerformance.score >= 65 ? C.green
    : overallPerformance.score >= 45 ? C.amber
    : C.red;

  const overallDonut = {
    labels: ["Score", ""],
    datasets: [{
      data: [overallPerformance.score, 100 - overallPerformance.score],
      backgroundColor: [scoreColor, "#f3f4f6"],
      borderWidth: 0,
    }],
  };

  const initials = [student.firstName?.[0], student.lastName?.[0]].filter(Boolean).join("").toUpperCase();
  const risk = overallPerformance.risk;
  const rc = riskColors(risk);

  return (
    <div className="space-y-6 max-w-7xl pb-10">
      {/* ── Back bar ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Students
      </button>

      {/* ── Profile hero ────────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        {/* Coloured banner */}
        <div className="h-20 bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
            {/* Avatar */}
            <div className="shrink-0">
              {student.profileImage ? (
                <img
                  src={student.profileImage}
                  alt={student.fullName}
                  className="w-20 h-20 rounded-2xl border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                  {initials}
                </div>
              )}
            </div>

            {/* Name + tags */}
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{student.fullName}</h1>
                {/* Risk */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${rc.bg} ${rc.border} ${rc.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                  {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
                </span>
                {/* Grade */}
                <span className={`text-sm font-bold px-3 py-1 rounded-lg border ${gradeColor(overallPerformance.grade)}`}>
                  {overallPerformance.grade}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{student.email}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-500">
                {student.program?.name && <span><span className="font-medium text-gray-700">Program:</span> {student.program.name}</span>}
                {student.batch?.name && <span><span className="font-medium text-gray-700">Batch:</span> {student.batch.name}</span>}
                {student.group?.name && <span><span className="font-medium text-gray-700">Group:</span> {student.group.name}</span>}
                {student.dob && <span><span className="font-medium text-gray-700">DOB:</span> {new Date(student.dob).toLocaleDateString()}</span>}
                {student.phone && <span><span className="font-medium text-gray-700">Phone:</span> {student.phone}</span>}
              </div>
            </div>

            {/* Overall score donut */}
            <div className="shrink-0 flex flex-col items-center gap-1 sm:ml-auto">
              <div className="w-28 h-28 relative">
                <Doughnut
                  data={overallDonut}
                  options={{ ...CHART_OPT, cutout: "76%", plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-gray-800">{overallPerformance.score}</span>
                  <span className="text-[10px] text-gray-400 font-medium">/ 100</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium">Overall Score</p>
            </div>
          </div>
        </div>
      </Card>

      {/* ── KPI row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Calendar} label="Attendance Rate" value={`${attendance.attendanceRate}%`}
          sub={`${attendance.totalPresent} days present`}
          accent={attendance.attendanceRate >= 75 ? "bg-green-500" : attendance.attendanceRate >= 60 ? "bg-amber-500" : "bg-red-500"} />
        <KpiCard icon={BookOpen} label="Avg Exam Score" value={`${examResults.avgScore}%`}
          sub={`${examResults.attemptedExams} exams attempted`}
          accent={examResults.avgScore >= 60 ? "bg-indigo-500" : examResults.avgScore >= 40 ? "bg-amber-500" : "bg-red-500"} />
        <KpiCard icon={MessageSquare} label="Total Remarks" value={remarks.total}
          sub={`${remarks.positiveCount} positive · ${remarks.negativeCount} negative`}
          accent="bg-cyan-500" />
        <KpiCard icon={Flame} label="Attendance Streak" value={`${attendance.currentStreak}d`}
          sub={`Max streak: ${attendance.maxStreak} days`}
          accent="bg-orange-500" />
      </div>

      {/* ── Row 1: Attendance chart (2/3) + Module radar (1/3) ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <Card className="lg:col-span-2">
          <CardHeader
            title="Monthly Attendance Trend"
            right={
              <div className="flex items-center gap-2">
                <TrendPill trend={attendance.trend} />
                <span className="text-xs text-gray-400 hidden sm:block">
                  Next month forecast: <strong className="text-indigo-600">{attendance.predictedNextMonth}%</strong>
                </span>
              </div>
            }
          />
          <div className="p-5 h-60">
            {attLabels.length > 0 ? (
              <Line data={attChartData} options={{
                ...CHART_OPT,
                scales: {
                  y: { min: 0, max: 100, ticks: { font: { size: 10 }, callback: (v) => `${v}%` }, grid: { color: "rgba(0,0,0,0.04)" } },
                  x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                },
                plugins: { ...CHART_OPT.plugins, tooltip: { callbacks: { label: (c) => `${c.parsed.y}% present` } } },
              }} />
            ) : (
              <EmptyState label="No attendance data" />
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Module Performance" />
          <div className="p-5 h-64">
            {modPerf.length > 0 ? (
              <Radar data={radarData} options={{
                ...CHART_OPT,
                scales: {
                  r: {
                    min: 0, max: 100,
                    ticks: { font: { size: 9 }, stepSize: 25, backdropColor: "transparent" },
                    pointLabels: { font: { size: 9 } },
                    grid: { color: "rgba(0,0,0,0.06)" },
                  },
                },
                plugins: { legend: { display: false } },
              }} />
            ) : (
              <EmptyState label="No module data" />
            )}
          </div>
        </Card>
      </div>

      {/* ── Row 2: Exam bar (2/3) + Remarks donut (1/3) ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <Card className="lg:col-span-2">
          <CardHeader
            title="Exam Results"
            right={
              <div className="flex items-center gap-2">
                <TrendPill trend={examResults.trend} />
                <span className="text-xs text-gray-400 hidden sm:block">
                  Next forecast: <strong className="text-indigo-600">{examResults.predictedNextScore}%</strong>
                </span>
              </div>
            }
          />
          <div className="p-5 h-60">
            {scoredExams.length > 0 ? (
              <Bar data={examChartData} options={{
                ...CHART_OPT,
                scales: {
                  y: { min: 0, max: 100, ticks: { font: { size: 10 }, callback: (v) => `${v}%` }, grid: { color: "rgba(0,0,0,0.04)" } },
                  x: { ticks: { font: { size: 9 }, maxRotation: 30, minRotation: 10 }, grid: { display: false } },
                },
                plugins: { ...CHART_OPT.plugins, tooltip: { callbacks: { label: (c) => `Score: ${c.parsed.y}%` } } },
              }} />
            ) : (
              <EmptyState label="No exam data" />
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Remarks by Type" right={<span className="text-xs text-gray-400">{remarks.total} total</span>} />
          <div className="p-5 h-64">
            {remarkTypes.length > 0 ? (
              <Doughnut data={remarkDonut} options={{
                ...CHART_OPT, cutout: "52%",
                plugins: { legend: { position: "bottom", labels: { font: { size: 10 }, boxWidth: 10, padding: 12 } } },
              }} />
            ) : (
              <EmptyState label="No remarks" />
            )}
          </div>
          {/* Sentiment strip */}
          {remarks.total > 0 && (
            <div className="px-5 pb-4 flex gap-2 text-xs">
              {[
                { label: "Positive", count: remarks.positiveCount, cls: "bg-green-100 text-green-700" },
                { label: "Neutral", count: remarks.neutralCount, cls: "bg-gray-100 text-gray-600" },
                { label: "Negative", count: remarks.negativeCount, cls: "bg-red-100 text-red-600" },
              ].map((s) => (
                <span key={s.label} className={`flex-1 text-center px-2 py-1 rounded-lg font-medium ${s.cls}`}>
                  {s.label} {s.count}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* ── Row 3: ML Insights + Recent Remarks ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ML Insights */}
        <Card>
          <CardHeader title="ML-Powered Analysis" right={<Brain size={16} className="text-indigo-400" />} />
          <div className="p-5 space-y-4">
            {/* Regression bars */}
            {[
              { label: "Attendance R²", value: attendance.regression?.r2 || 0, color: "bg-indigo-500" },
              { label: "Exam Score R²", value: examResults.regression?.r2 || 0, color: "bg-violet-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{item.label}</span>
                  <span className="font-mono font-semibold text-gray-700">{item.value.toFixed(3)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: `${Math.round(item.value * 100)}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Slope info */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { label: "Attendance Slope", value: attendance.regression?.slope?.toFixed(3), unit: "/month" },
                { label: "Exam Score Slope", value: examResults.regression?.slope?.toFixed(3), unit: "/exam" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">{s.label}</p>
                  <p className="text-sm font-bold font-mono text-gray-800 mt-0.5">{s.value}<span className="text-xs font-normal text-gray-400 ml-0.5">{s.unit}</span></p>
                </div>
              ))}
            </div>

            {/* Insights */}
            <div className="space-y-2 pt-1 border-t border-gray-50">
              {(overallPerformance.insights || []).map((insight: string, i: number) => {
                const isGood = insight.toLowerCase().includes("excellent") || insight.toLowerCase().includes("improving") || insight.toLowerCase().includes("on track");
                const isWarn = insight.toLowerCase().includes("below") || insight.toLowerCase().includes("critical") || insight.toLowerCase().includes("declining");
                const Icon = isGood ? CheckCircle : isWarn ? AlertTriangle : Info;
                const cls = isGood ? "text-green-600" : isWarn ? "text-amber-600" : "text-indigo-500";
                return (
                  <div key={i} className="flex items-start gap-2">
                    <Icon size={13} className={`${cls} mt-0.5 shrink-0`} />
                    <p className="text-xs text-gray-600 leading-relaxed">{insight}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Recent Remarks */}
        <Card>
          <CardHeader title="Recent Remarks" right={<Award size={16} className="text-indigo-400" />} />
          <div className="p-5 space-y-2 max-h-80 overflow-y-auto">
            {(remarks.recent || []).length === 0 && (
              <EmptyState label="No remarks recorded yet" />
            )}
            {(remarks.recent || []).map((r: any) => {
              const typeColors: Record<string, string> = {
                academic: "bg-indigo-50 text-indigo-700 border-indigo-200",
                behavioral: "bg-red-50 text-red-700 border-red-200",
                attendance: "bg-amber-50 text-amber-700 border-amber-200",
                participation: "bg-green-50 text-green-700 border-green-200",
                achievement: "bg-violet-50 text-violet-700 border-violet-200",
                general: "bg-gray-100 text-gray-600 border-gray-200",
              };
              return (
                <div key={r.id} className="group border border-gray-100 rounded-xl p-3 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${typeColors[r.type] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {r.type}
                    </span>
                    <span className="text-[10px] text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">{r.subject}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{r.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">By {r.teacherName}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── Exam detail table ────────────────────────────────────────────── */}
      {examResults.exams?.length > 0 && (
        <Card>
          <CardHeader title="Exam Results Breakdown" right={
            <span className="text-xs text-gray-400">{examResults.attemptedExams} / {examResults.totalExams} attempted</span>
          } />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase tracking-wide text-[10px]">
                  {["Exam", "Type", "Obtained", "%", "Grade"].map((h) => (
                    <th key={h} className={`py-3 px-4 font-semibold ${h !== "Exam" ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {examResults.exams.map((exam: any) => (
                  <tr key={exam.examId} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{exam.examName}</td>
                    <td className="py-3 px-4 text-center capitalize text-gray-500">{exam.examType}</td>
                    <td className="py-3 px-4 text-center text-gray-700">
                      {exam.percentage !== null ? `${exam.obtainedTotal} / ${exam.maxTotal}` : "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {exam.percentage !== null ? (
                        <span className={`font-semibold ${exam.percentage >= 60 ? "text-green-600" : "text-red-500"}`}>
                          {exam.percentage}%
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${gradeColor(exam.grade)}`}>
                        {exam.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── Module performance table ─────────────────────────────────────── */}
      {examResults.modulePerformance?.length > 0 && (
        <Card>
          <CardHeader title="Performance by Module" />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase tracking-wide text-[10px]">
                  {["Module", "Attempts", "Avg Score", "Avg Max", "%", "Progress"].map((h) => (
                    <th key={h} className={`py-3 px-4 font-semibold ${h === "Module" || h === "Progress" ? "text-left" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...(examResults.modulePerformance || [])].sort((a: any, b: any) => b.pct - a.pct).map((mod: any, i: number) => (
                  <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{mod.moduleName}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{mod.attempts}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{mod.avgScore}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{mod.avgTotal}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-semibold ${mod.pct >= 60 ? "text-green-600" : "text-red-500"}`}>{mod.pct}%</span>
                    </td>
                    <td className="py-3 px-4 min-w-[140px]">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, mod.pct)}%`,
                            backgroundColor: mod.pct >= 60 ? C.green : C.red,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="h-full flex items-center justify-center text-sm text-gray-400">{label}</div>
  );
}
