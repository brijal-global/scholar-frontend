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
import { Line, Doughnut, Radar, Chart as MixedChart } from "react-chartjs-2";
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
  Brain,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Layers,
  Users,
  Clock,
  BarChart2,
  Sigma,
  Lightbulb,
  Target,
  Activity,
  Star,
  ThumbsDown,
  Meh,
} from "lucide-react";
import Image from "next/image";

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

// ─── Palette ──────────────────────────────────────────────────────────────────
const P = {
  indigo: "#6366f1",
  indigoMid: "rgba(99,102,241,0.3)",
  indigoFill: "rgba(99,102,241,0.08)",
  violet: "#7c3aed",
  green: "#16a34a",
  greenFill: "rgba(22,163,74,0.1)",
  red: "#dc2626",
  redFill: "rgba(220,38,38,0.1)",
  amber: "#d97706",
  amberFill: "rgba(217,119,6,0.1)",
  cyan: "#0891b2",
  teal: "#0d9488",
  slate: "#64748b",
};
const REMARK_COLORS = [
  P.indigo,
  P.green,
  P.amber,
  P.red,
  P.cyan,
  P.violet,
  P.teal,
];

// ─── Grade helpers ────────────────────────────────────────────────────────────
function gradeStyle(g: string) {
  if (g === "A+" || g === "A")
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    };
  if (g === "B")
    return {
      text: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
    };
  if (g === "C")
    return {
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
    };
  if (g === "D")
    return {
      text: "text-orange-700",
      bg: "bg-orange-50",
      border: "border-orange-200",
    };
  return { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" };
}

function riskStyle(r: string) {
  if (r === "low")
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      label: "Low Risk",
    };
  if (r === "medium")
    return {
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      dot: "bg-amber-500",
      label: "Medium Risk",
    };
  return {
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    label: "High Risk",
  };
}

function scoreAccent(v: number, good = 75, warn = 60) {
  if (v >= good)
    return { bar: "bg-emerald-500", text: "text-emerald-600", ring: "#16a34a" };
  if (v >= warn)
    return { bar: "bg-amber-500", text: "text-amber-600", ring: "#d97706" };
  return { bar: "bg-red-500", text: "text-red-600", ring: "#dc2626" };
}

// ─── Shared chart defaults ────────────────────────────────────────────────────
const BASE_OPT: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { size: 11, family: "inherit" },
        boxWidth: 10,
        padding: 12,
      },
    },
  },
};

// ─── Primitive components ─────────────────────────────────────────────────────
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

function SectionTitle({
  icon: Icon,
  title,
  description,
  right,
}: {
  icon?: any;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2.5">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={15} className="text-indigo-600" />
          </div>
        )}
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl shadow-xs ${className}`}
    >
      {children}
    </div>
  );
}

function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function CardDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-y border-gray-100">
      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function TrendChip({ trend }: { trend: string }) {
  const cfg = {
    improving: {
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Icon: TrendingUp,
      label: "Improving",
    },
    declining: {
      cls: "bg-red-50 text-red-600 border-red-200",
      Icon: TrendingDown,
      label: "Declining",
    },
    stable: {
      cls: "bg-gray-100 text-gray-500 border-gray-200",
      Icon: Minus,
      label: "Stable",
    },
  } as const;
  const key =
    (trend as keyof typeof cfg) in cfg ? (trend as keyof typeof cfg) : "stable";
  const { cls, Icon, label } = cfg[key];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${cls}`}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "success" | "warn" | "error";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-indigo-50 border-indigo-200 text-indigo-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    warn: "bg-amber-50 border-amber-200 text-amber-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };
  const icons = {
    info: Info,
    success: CheckCircle,
    warn: AlertTriangle,
    error: AlertTriangle,
  };
  const Icon = icons[type];
  return (
    <div
      className={`flex items-start gap-2.5 text-xs rounded-xl border p-3 ${styles[type]}`}
    >
      <Icon size={13} className="shrink-0 mt-0.5" />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

function StatPill({
  label,
  value,
  sub,
  color = "text-gray-900",
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center px-3">
      <p className={`text-lg font-bold leading-none ${color}`}>{value}</p>
      <p className="text-[10px] text-gray-500 mt-1 font-medium">{label}</p>
      {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function MiniBar({
  value,
  max = 100,
  color = "bg-indigo-500",
}: {
  value: number;
  max?: number;
  color?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | undefined | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon size={13} className="text-gray-400 shrink-0" />
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-300">
      <BarChart2 size={28} />
      <p className="text-xs">{label}</p>
    </div>
  );
}

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
        <p className="text-gray-400 text-sm">
          {error || "No analytics data found."}
        </p>
        <button
          onClick={() => router.back()}
          className="text-xs text-indigo-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const { student, attendance, examResults, remarks, overallPerformance } =
    data;

  // ─── Derived values ──────────────────────────────────────────────────────────
  const risk = overallPerformance.risk;
  const rs = riskStyle(risk);
  const gs = gradeStyle(overallPerformance.grade);
  const scoreAcc = scoreAccent(overallPerformance.score, 65, 45);
  const initials = [student.firstName?.[0], student.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  const attAcc = scoreAccent(attendance.attendanceRate, 75, 60);
  const examAcc = scoreAccent(examResults.avgScore, 60, 40);

  // ─── Chart data ──────────────────────────────────────────────────────────────
  const attLabels = (attendance.monthlyBreakdown || []).map((m: any) => {
    const [yr, mo] = m.month.split("-");
    return new Date(+yr, +mo - 1).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
  });
  const attRates = (attendance.monthlyBreakdown || []).map((m: any) => m.rate);

  const attChartData = {
    labels: attLabels,
    datasets: [
      {
        label: "Attendance %",
        data: attRates,
        borderColor: P.indigo,
        backgroundColor: P.indigoFill,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#fff",
        pointBorderColor: P.indigo,
        pointBorderWidth: 2,
      },
      {
        label: "75% threshold",
        data: attLabels.map(() => 75),
        borderColor: "rgba(220,38,38,0.35)",
        borderDash: [5, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const scoredExams = (examResults.exams || []).filter(
    (e: any) => e.percentage !== null,
  );
  const examChartData = {
    labels: scoredExams.map((e: any) => e.examName?.slice(0, 16) || "Exam"),
    datasets: [
      {
        type: "bar" as const,
        label: "Score %",
        data: scoredExams.map((e: any) => e.percentage),
        backgroundColor: scoredExams.map((e: any) =>
          e.percentage >= 60 ? P.greenFill : P.redFill,
        ),
        borderColor: scoredExams.map((e: any) =>
          e.percentage >= 60 ? P.green : P.red,
        ),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        type: "line" as const,
        label: "Pass threshold (60%)",
        data: scoredExams.map(() => 60),
        borderColor: "rgba(220,38,38,0.35)",
        borderDash: [5, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const modPerf = (examResults.modulePerformance || []).slice(0, 7);
  const radarData = {
    labels: modPerf.map((m: any) => m.moduleName?.slice(0, 14) || ""),
    datasets: [
      {
        label: "Score %",
        data: modPerf.map((m: any) => m.pct),
        backgroundColor: P.indigoFill,
        borderColor: P.indigo,
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: P.indigo,
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const remarkKeys = Object.keys(remarks.byType || {});
  const donutData = {
    labels: remarkKeys,
    datasets: [
      {
        data: Object.values(remarks.byType || {}) as number[],
        backgroundColor: REMARK_COLORS.slice(0, remarkKeys.length),
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const overallDonut = {
    labels: ["Score", ""],
    datasets: [
      {
        data: [overallPerformance.score, 100 - overallPerformance.score],
        backgroundColor: [scoreAcc.ring, "#f1f5f9"],
        borderWidth: 0,
      },
    ],
  };

  // R² interpretation helpers
  function r2Label(r2: number) {
    if (r2 >= 0.8) return { text: "High confidence", cls: "text-emerald-600" };
    if (r2 >= 0.5)
      return { text: "Moderate confidence", cls: "text-amber-600" };
    return { text: "Low confidence", cls: "text-gray-400" };
  }
  function slopeLabel(slope: number, unit: string) {
    if (slope > 0) return `+${slope} ${unit} on average (improving)`;
    if (slope < 0) return `${slope} ${unit} on average (declining)`;
    return `0 ${unit} (no change detected)`;
  }

  // Insight classification
  function classifyInsight(
    text: string,
  ): "success" | "warn" | "error" | "info" {
    const t = text.toLowerCase();
    if (
      t.includes("excellent") ||
      t.includes("improving") ||
      t.includes("on track") ||
      t.includes("streak")
    )
      return "success";
    if (
      t.includes("critical") ||
      t.includes("low") ||
      t.includes("declining") ||
      t.includes("immediate")
    )
      return "error";
    if (
      t.includes("below") ||
      t.includes("outnumber") ||
      t.includes("threshold")
    )
      return "warn";
    return "info";
  }

  const remarkTypeInfo: Record<string, string> = {
    academic: "Related to academic performance & subject marks",
    behavioral: "Related to conduct, discipline or behaviour",
    attendance: "Related to absence, tardiness or attendance patterns",
    achievement: "Positive recognition of achievements",
    participation: "Positive recognition of class participation",
    general: "General notes and miscellaneous observations",
  };

  return (
    <div className="max-w-7xl pb-12 space-y-8">
      {/* ── Back ────────────────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Students
      </button>

      {/* ══ SECTION 1 — Student Profile ═════════════════════════════════════ */}
      <Card className="overflow-hidden">
        {/* ── Banner ────────────────────────────────────────────────────── */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #09090f 0%, #1a1040 40%, #2d1b6e 70%, #1e1035 100%)",
          }}
        >
          {/* Mesh grid */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <pattern
                id="prof-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="rgba(165,180,252,0.12)"
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#prof-grid)" />
          </svg>

          {/* Radial glow — right */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)",
            }}
          />
          {/* Radial glow — left */}
          <div
            className="absolute top-6 -left-10 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
            }}
          />
          {/* Radial glow — centre-bottom */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)",
            }}
          />

          {/* Diagonal accent line */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="100%"
              x2="100%"
              y2="0"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="-10%"
              y1="100%"
              x2="90%"
              y2="0"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>

          {/* Top-left label */}
          <div className="absolute top-4 left-5 flex items-center gap-2.5">
            <div className="w-0.5 h-5 rounded-full bg-indigo-400/70" />
            <span className="text-[10px] font-semibold text-white/45 uppercase tracking-[0.22em] select-none">
              Academic Performance Report
            </span>
          </div>

          {/* Bottom fade into white card body */}
          <div
            className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0,0,0,0.35))",
            }}
          />
        </div>

        <CardBody className="pt-20">
          <div className="flex flex-col sm:flex-row gap-5 -mt-14">
            {/* Avatar */}
            <div className="shrink-0">
              {student.profileImage ? (
                <Image
                  src={student.profileImage}
                  alt={student.fullName}
                  className="w-22 h-22 rounded-2xl border-4 border-white shadow-lg object-cover"
                  width={88}
                  height={88}
                />
              ) : (
                <div
                  className="w-22 h-22 rounded-2xl border-4 border-white shadow-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white select-none"
                  style={{ width: 88, height: 88 }}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 pb-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900">
                  {student.fullName}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${rs.bg} ${rs.border} ${rs.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${rs.dot}`} />
                  {rs.label}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg border ${gs.bg} ${gs.border} ${gs.text}`}
                >
                  Grade {overallPerformance.grade}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4 mt-5">
                {/* <InfoRow icon={Mail} label="Email" value={student.email} /> */}
                <InfoRow icon={Phone} label="Phone" value={student.phone} />
                <InfoRow
                  icon={GraduationCap}
                  label="Program"
                  value={student.program?.name}
                />
                <InfoRow
                  icon={Layers}
                  label="Batch"
                  value={student.batch?.name}
                />
                <InfoRow
                  icon={Users}
                  label="Group"
                  value={student.group?.name}
                />
                <InfoRow icon={User} label="Gender" value={student.gender} />
                <InfoRow
                  icon={Calendar}
                  label="DOB"
                  value={
                    student.dob
                      ? new Date(student.dob).toLocaleDateString()
                      : null
                  }
                />
                <InfoRow
                  icon={Clock}
                  label="Enrolled"
                  value={
                    student.enrolledAt
                      ? new Date(student.enrolledAt).toLocaleDateString()
                      : null
                  }
                />
                {student.address && (
                  <InfoRow
                    icon={MapPin}
                    label="Address"
                    value={student.address}
                  />
                )}
              </div>
            </div>

            {/* Score ring */}
            <div className="shrink-0 flex flex-col items-center gap-1.5 sm:ml-auto">
              <div className="relative w-28 h-28">
                <Doughnut
                  data={overallDonut}
                  options={{
                    ...BASE_OPT,
                    cutout: "76%",
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false },
                    },
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-extrabold ${scoreAcc.text}`}>
                    {overallPerformance.score}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    out of 100
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium text-center leading-tight">
                Performance Score
              </p>
            </div>
          </div>

          {/* Score formula note */}
          <div className="mt-5 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-500">
            <span className="font-semibold text-gray-600">Score formula:</span>
            <span>
              Attendance{" "}
              <span className="text-indigo-600 font-semibold">40%</span>
            </span>
            <span>+</span>
            <span>
              Exam Average{" "}
              <span className="text-indigo-600 font-semibold">50%</span>
            </span>
            <span>+</span>
            <span>
              Positive Remarks ratio{" "}
              <span className="text-indigo-600 font-semibold">10%</span>
            </span>
            <span className="ml-auto italic text-gray-400">
              Higher score = better overall academic health
            </span>
          </div>
        </CardBody>
      </Card>

      {/* ══ SECTION 2 — KPIs ════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Attendance */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${attAcc.bar}`}
            >
              <Calendar size={17} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                Attendance Rate
              </p>
              <p
                className={`text-2xl font-extrabold leading-tight ${attAcc.text}`}
              >
                {attendance.attendanceRate}%
              </p>
            </div>
          </div>
          <MiniBar value={attendance.attendanceRate} color={attAcc.bar} />
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            {attendance.totalPresent} days present out of ~
            {attendance.totalWorkingDays} working days.
            {attendance.attendanceRate < 75
              ? " ⚠ Below the 75% minimum requirement."
              : " ✓ Meets attendance requirements."}
          </p>
        </Card>

        {/* Exam score */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${examAcc.bar}`}
            >
              <BookOpen size={17} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                Avg Exam Score
              </p>
              <p
                className={`text-2xl font-extrabold leading-tight ${examAcc.text}`}
              >
                {examResults.avgScore}%
              </p>
            </div>
          </div>
          <MiniBar value={examResults.avgScore} color={examAcc.bar} />
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            Across {examResults.attemptedExams} of {examResults.totalExams}{" "}
            exams attempted. Overall grade:{" "}
            <span className="font-semibold text-gray-600">
              {examResults.overallGrade}
            </span>
            .
          </p>
        </Card>

        {/* Remarks */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-cyan-500">
              <MessageSquare size={17} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                Teacher Remarks
              </p>
              <p className="text-2xl font-extrabold text-gray-900 leading-tight">
                {remarks.total}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-1">
            {[
              {
                label: "Positive",
                count: remarks.positiveCount,
                cls: "bg-emerald-100 text-emerald-700",
              },
              {
                label: "Neutral",
                count: remarks.neutralCount,
                cls: "bg-gray-100 text-gray-600",
              },
              {
                label: "Negative",
                count: remarks.negativeCount,
                cls: "bg-red-100 text-red-600",
              },
            ].map((s) => (
              <span
                key={s.label}
                className={`flex-1 text-center text-[10px] px-1 py-1 rounded-lg font-semibold ${s.cls}`}
              >
                {s.count}
                <br />
                <span className="font-normal">{s.label}</span>
              </span>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            Remarks are classified as positive (achievements), negative
            (behaviour/attendance), or neutral.
          </p>
        </Card>

        {/* Streak */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-orange-500">
              <Flame size={17} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                Attendance Streak
              </p>
              <p className="text-2xl font-extrabold text-gray-900 leading-tight">
                {attendance.currentStreak}d
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-400">Current</span>
            <span className="text-gray-400">Best ever</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-400 transition-all"
              style={{
                width: `${attendance.maxStreak > 0 ? (attendance.currentStreak / attendance.maxStreak) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>{attendance.currentStreak} days</span>
            <span>{attendance.maxStreak} days</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            Consecutive days attended. Longer streaks indicate consistent
            engagement.
          </p>
        </Card>
      </div>

      {/* ══ SECTION 3 — Attendance Analysis ════════════════════════════════ */}
      <Section>
        <SectionTitle
          icon={Activity}
          title="Attendance Analysis"
          description="Month-by-month attendance rate. The dashed line marks the 75% minimum threshold required for exam eligibility."
          right={<TrendChip trend={attendance.trend} />}
        />
        <Card>
          <CardBody>
            {/* Chart */}
            <div className="h-56">
              {attLabels.length > 0 ? (
                <Line
                  data={attChartData}
                  options={{
                    ...BASE_OPT,
                    interaction: { mode: "index", intersect: false },
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        ticks: {
                          font: { size: 10 },
                          callback: (v: any) => `${v}%`,
                        },
                        grid: { color: "rgba(0,0,0,0.04)" },
                      },
                      x: {
                        ticks: { font: { size: 10 } },
                        grid: { display: false },
                      },
                    },
                    plugins: {
                      ...BASE_OPT.plugins,
                      tooltip: {
                        callbacks: {
                          label: (c: any) =>
                            c.dataset.label === "75% threshold"
                              ? ""
                              : `Attendance: ${c.parsed.y}%`,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <EmptyChart label="No attendance records found" />
              )}
            </div>
          </CardBody>

          <CardDivider label="Monthly summary" />
          <CardBody>
            <div className="flex flex-wrap gap-3 justify-around">
              <StatPill
                label="Days Present"
                value={attendance.totalPresent}
                color="text-indigo-600"
              />
              <div className="w-px bg-gray-100" />
              <StatPill
                label="Working Days (est.)"
                value={attendance.totalWorkingDays}
              />
              <div className="w-px bg-gray-100" />
              <StatPill
                label="Attendance Rate"
                value={`${attendance.attendanceRate}%`}
                color={attAcc.text}
              />
              <div className="w-px bg-gray-100" />
              <StatPill
                label="AI-Predicted Next Month"
                value={`${attendance.predictedNextMonth}%`}
                color="text-violet-600"
                sub="Based on TF regression"
              />
            </div>
          </CardBody>

          <CardDivider label="What this tells you" />
          <CardBody>
            {attendance.trend === "improving" && (
              <Callout type="success">
                Attendance is on an upward trend. The student is becoming more
                regular — continue to encourage this behaviour.
              </Callout>
            )}
            {attendance.trend === "declining" && (
              <Callout type="warn">
                Attendance is declining over time. Early intervention is
                recommended — speak with the student or guardian before it
                reaches a critical level.
              </Callout>
            )}
            {attendance.trend === "stable" && (
              <Callout type="info">
                Attendance has been relatively consistent. Watch for sudden
                drops that could indicate underlying issues.
              </Callout>
            )}
          </CardBody>
        </Card>
      </Section>

      {/* ══ SECTION 4 — Exam Performance ════════════════════════════════════ */}
      <Section>
        <SectionTitle
          icon={BookOpen}
          title="Exam Performance"
          description="Score percentage per exam. Green bars indicate a pass (≥60%), red bars indicate a fail. The dashed line marks the pass threshold."
          right={
            <div className="flex items-center gap-2">
              <TrendChip trend={examResults.trend} />
              <span className="text-xs text-gray-400 hidden sm:block">
                AI next score prediction:{" "}
                <strong className="text-indigo-600">
                  {examResults.predictedNextScore}%
                </strong>
              </span>
            </div>
          }
        />
        <Card>
          <CardBody>
            <div className="h-56">
              {scoredExams.length > 0 ? (
                <MixedChart
                  type="bar"
                  data={examChartData as any}
                  options={{
                    ...BASE_OPT,
                    interaction: { mode: "index", intersect: false },
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        ticks: {
                          font: { size: 10 },
                          callback: (v: any) => `${v}%`,
                        },
                        grid: { color: "rgba(0,0,0,0.04)" },
                      },
                      x: {
                        ticks: {
                          font: { size: 9 },
                          maxRotation: 30,
                          minRotation: 0,
                        },
                        grid: { display: false },
                      },
                    },
                    plugins: {
                      ...BASE_OPT.plugins,
                      tooltip: {
                        callbacks: {
                          label: (c: any) =>
                            c.dataset.label === "Pass threshold (60%)"
                              ? ""
                              : `Score: ${c.parsed.y}%`,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <EmptyChart label="No exam results found" />
              )}
            </div>
          </CardBody>

          {(examResults.bestModule || examResults.worstModule) && (
            <>
              <CardDivider label="Module highlights" />
              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {examResults.bestModule && (
                    <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                      <Star
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-semibold text-emerald-800">
                          Strongest Module
                        </p>
                        <p className="text-sm font-bold text-emerald-900 mt-0.5">
                          {examResults.bestModule.moduleName}
                        </p>
                        <p className="text-xs text-emerald-600 mt-0.5">
                          {examResults.bestModule.pct}% average —{" "}
                          {examResults.bestModule.attempts} attempts
                        </p>
                      </div>
                    </div>
                  )}
                  {examResults.worstModule &&
                    examResults.worstModule.moduleName !==
                      examResults.bestModule?.moduleName && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                        <ThumbsDown
                          size={16}
                          className="text-red-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="text-xs font-semibold text-red-800">
                            Needs Most Attention
                          </p>
                          <p className="text-sm font-bold text-red-900 mt-0.5">
                            {examResults.worstModule.moduleName}
                          </p>
                          <p className="text-xs text-red-500 mt-0.5">
                            {examResults.worstModule.pct}% average — consider
                            extra support
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </CardBody>
            </>
          )}

          <CardDivider label="What this tells you" />
          <CardBody>
            {examResults.trend === "improving" && (
              <Callout type="success">
                Exam scores are trending upward. The student is gaining a better
                grasp of the curriculum over time — positive reinforcement will
                help maintain this.
              </Callout>
            )}
            {examResults.trend === "declining" && (
              <Callout type="error">
                Exam scores are declining. Consider reviewing study habits,
                addressing knowledge gaps in weak modules, and scheduling extra
                support sessions.
              </Callout>
            )}
            {examResults.trend === "stable" && (
              <Callout type="info">
                Exam performance is consistent. To move to a higher grade band,
                focus on strengthening weak modules identified in the radar
                chart below.
              </Callout>
            )}
          </CardBody>
        </Card>
      </Section>

      {/* ══ SECTION 5 — Module Radar + Remarks ══════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Module Radar */}
        <Section>
          <SectionTitle
            icon={Target}
            title="Module Performance Radar"
            description="Each axis represents a subject module. The further a point extends from centre, the better the student scored in that module."
          />
          <Card className="h-full">
            <CardBody>
              <div className="h-64">
                {modPerf.length > 0 ? (
                  <Radar
                    data={radarData}
                    options={{
                      ...BASE_OPT,
                      scales: {
                        r: {
                          min: 0,
                          max: 100,
                          ticks: {
                            font: { size: 9 },
                            stepSize: 25,
                            backdropColor: "transparent",
                          },
                          pointLabels: { font: { size: 9 } },
                          grid: { color: "rgba(0,0,0,0.06)" },
                          angleLines: { color: "rgba(0,0,0,0.06)" },
                        },
                      },
                      plugins: { legend: { display: false } },
                    }}
                  />
                ) : (
                  <EmptyChart label="No module data available" />
                )}
              </div>
            </CardBody>
            <CardDivider label="Reading the chart" />
            <CardBody>
              <Callout type="info">
                A balanced, outward-reaching shape means well-rounded
                performance. A collapsed or uneven shape highlights modules that
                need extra attention. Aim for all axes to reach beyond the 60%
                ring.
              </Callout>
            </CardBody>
          </Card>
        </Section>

        {/* Remarks Breakdown */}
        <Section>
          <SectionTitle
            icon={MessageSquare}
            title="Remarks Distribution"
            description="Teacher remarks categorised by type. A higher proportion of achievement & participation remarks indicates positive engagement."
          />
          <Card className="h-full">
            <CardBody>
              <div className="h-52">
                {remarkKeys.length > 0 ? (
                  <Doughnut
                    data={donutData}
                    options={{
                      ...BASE_OPT,
                      cutout: "50%",
                      plugins: {
                        legend: {
                          position: "right",
                          labels: {
                            font: { size: 10 },
                            boxWidth: 10,
                            padding: 10,
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <EmptyChart label="No remarks recorded yet" />
                )}
              </div>
            </CardBody>

            {remarkKeys.length > 0 && (
              <>
                <CardDivider label="Category guide" />
                <CardBody>
                  <div className="space-y-1.5">
                    {remarkKeys.map((k, i) => (
                      <div key={k} className="flex items-center gap-2 text-xs">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              REMARK_COLORS[i % REMARK_COLORS.length],
                          }}
                        />
                        <span className="font-medium text-gray-700 capitalize">
                          {k}
                        </span>
                        <span className="text-gray-400">—</span>
                        <span className="text-gray-400">
                          {remarkTypeInfo[k] || "Miscellaneous note"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </>
            )}
          </Card>
        </Section>
      </div>

      {/* ══ SECTION 6 — AI / ML Analysis ════════════════════════════════════ */}
      <Section>
        <SectionTitle
          icon={Brain}
          title="AI-Powered Analysis"
          description="Linear regression models trained on this student's historical data produce trend predictions and confidence scores. These are not guarantees — they are data-informed signals."
        />
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendance regression */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-indigo-500" />
                  <p className="text-sm font-semibold text-gray-800">
                    Attendance Regression
                  </p>
                </div>
                <div className="space-y-3">
                  {/* R² */}
                  <div>
                    <div className="flex items-end justify-between mb-1.5">
                      <span className="text-xs text-gray-500">
                        Model Confidence (R²)
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-700">
                        {(attendance.regression?.r2 || 0).toFixed(3)}
                      </span>
                    </div>
                    <MiniBar
                      value={(attendance.regression?.r2 || 0) * 100}
                      color="bg-indigo-500"
                    />
                    <p
                      className={`text-[10px] mt-1 font-medium ${r2Label(attendance.regression?.r2 || 0).cls}`}
                    >
                      {r2Label(attendance.regression?.r2 || 0).text}
                    </p>
                  </div>
                  {/* Slope */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
                      Rate of Change (Slope)
                    </p>
                    <p className="text-sm font-bold font-mono text-gray-800">
                      {attendance.regression?.slope?.toFixed(3)}
                      <span className="text-xs font-normal text-gray-400 ml-1">
                        /month
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {slopeLabel(attendance.regression?.slope || 0, "%/month")}
                    </p>
                  </div>
                  {/* Prediction */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                    <p className="text-[10px] text-indigo-500 uppercase tracking-wide font-semibold">
                      Predicted Next Month
                    </p>
                    <p className="text-xl font-extrabold text-indigo-700 mt-1">
                      {attendance.predictedNextMonth}%
                    </p>
                    <p className="text-[10px] text-indigo-400 mt-0.5">
                      Forecast based on recent attendance trend
                    </p>
                  </div>
                </div>
              </div>

              {/* Exam regression */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-violet-500" />
                  <p className="text-sm font-semibold text-gray-800">
                    Exam Score Regression
                  </p>
                </div>
                <div className="space-y-3">
                  {/* R² */}
                  <div>
                    <div className="flex items-end justify-between mb-1.5">
                      <span className="text-xs text-gray-500">
                        Model Confidence (R²)
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-700">
                        {(examResults.regression?.r2 || 0).toFixed(3)}
                      </span>
                    </div>
                    <MiniBar
                      value={(examResults.regression?.r2 || 0) * 100}
                      color="bg-violet-500"
                    />
                    <p
                      className={`text-[10px] mt-1 font-medium ${r2Label(examResults.regression?.r2 || 0).cls}`}
                    >
                      {r2Label(examResults.regression?.r2 || 0).text}
                    </p>
                  </div>
                  {/* Slope */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
                      Rate of Change (Slope)
                    </p>
                    <p className="text-sm font-bold font-mono text-gray-800">
                      {examResults.regression?.slope?.toFixed(3)}
                      <span className="text-xs font-normal text-gray-400 ml-1">
                        /exam
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {slopeLabel(examResults.regression?.slope || 0, "%/exam")}
                    </p>
                  </div>
                  {/* Prediction */}
                  <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
                    <p className="text-[10px] text-violet-500 uppercase tracking-wide font-semibold">
                      Predicted Next Exam Score
                    </p>
                    <p className="text-xl font-extrabold text-violet-700 mt-1">
                      {examResults.predictedNextScore}%
                    </p>
                    <p className="text-[10px] text-violet-400 mt-0.5">
                      Forecast based on recent exam performance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What R² means */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sigma size={13} className="text-slate-500" />
                <p className="text-xs font-semibold text-slate-600">
                  Understanding R² (Coefficient of Determination)
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                R² measures how well the model&apos;s trend line fits the data.
                R² = 1.0 means a perfect fit. R² ≥ 0.8 means high confidence in
                the prediction. R² &lt; 0.5 means the data is too irregular for
                reliable forecasting — but the directional trend (slope) is
                still meaningful.
              </p>
            </div>
          </CardBody>

          <CardDivider label="AI-generated insights" />
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(overallPerformance.insights || []).map(
                (insight: string, i: number) => (
                  <Callout key={i} type={classifyInsight(insight)}>
                    {insight}
                  </Callout>
                ),
              )}
            </div>
          </CardBody>
        </Card>
      </Section>

      {/* ══ SECTION 7 — Recent Remarks ══════════════════════════════════════ */}
      <Section>
        <SectionTitle
          icon={Lightbulb}
          title="Recent Teacher Remarks"
          description="The 10 most recent remarks logged by teachers. Remarks provide qualitative context that numbers alone cannot capture."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(remarks.recent || []).length === 0 ? (
            <Card className="sm:col-span-2">
              <CardBody className="text-center text-sm text-gray-400 py-10">
                No remarks have been recorded yet.
              </CardBody>
            </Card>
          ) : (
            (remarks.recent || []).map((r: any) => {
              const typeStyle: Record<string, string> = {
                academic: "bg-indigo-50 text-indigo-700 border-indigo-100",
                behavioral: "bg-red-50 text-red-700 border-red-100",
                attendance: "bg-amber-50 text-amber-700 border-amber-100",
                achievement:
                  "bg-emerald-50 text-emerald-700 border-emerald-100",
                participation: "bg-teal-50 text-teal-700 border-teal-100",
                general: "bg-gray-100 text-gray-600 border-gray-200",
              };
              const isPositive = ["achievement", "participation"].includes(
                r.type,
              );
              const isNegative = ["behavioral", "attendance"].includes(r.type);
              return (
                <Card
                  key={r.id}
                  className="hover:border-indigo-100 transition-colors"
                >
                  <CardBody className="py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border capitalize ${typeStyle[r.type] || typeStyle.general}`}
                      >
                        {r.type}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isPositive && (
                          <Star size={11} className="text-emerald-500" />
                        )}
                        {isNegative && (
                          <AlertTriangle size={11} className="text-amber-500" />
                        )}
                        {!isPositive && !isNegative && (
                          <Meh size={11} className="text-gray-400" />
                        )}
                        <span className="text-[10px] text-gray-400">
                          {new Date(r.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {r.subject}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-3">
                      {r.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2.5 pt-2 border-t border-gray-50">
                      Noted by{" "}
                      <span className="font-medium text-gray-500">
                        {r.teacherName}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              );
            })
          )}
        </div>
      </Section>

      {/* ══ SECTION 8 — Exam Results Table ══════════════════════════════════ */}
      {examResults.exams?.length > 0 && (
        <Section>
          <SectionTitle
            icon={BarChart2}
            title="Exam-by-Exam Breakdown"
            description="Detailed scores for every exam in the program. N/A indicates the student has not yet been assessed for that exam."
          />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-wider">
                    {[
                      { h: "Exam Name", align: "text-left" },
                      { h: "Type", align: "text-center" },
                      { h: "Obtained / Max", align: "text-center" },
                      { h: "Score %", align: "text-center" },
                      { h: "Grade", align: "text-center" },
                      { h: "Progress", align: "text-left" },
                    ].map(({ h, align }) => (
                      <th
                        key={h}
                        className={`py-3.5 px-5 font-semibold ${align}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {examResults.exams.map((exam: any) => {
                    const g = gradeStyle(exam.grade);
                    return (
                      <tr
                        key={exam.examId}
                        className="border-t border-gray-50 hover:bg-indigo-50/20 transition-colors"
                      >
                        <td className="py-3.5 px-5">
                          <p className="text-sm font-semibold text-gray-800">
                            {exam.examName}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {new Date(exam.date).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded-full">
                            {exam.examType || "—"}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-center text-sm text-gray-700">
                          {exam.percentage !== null ? (
                            `${exam.obtainedTotal} / ${exam.maxTotal}`
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          {exam.percentage !== null ? (
                            <span
                              className={`text-sm font-bold ${exam.percentage >= 60 ? "text-emerald-600" : "text-red-500"}`}
                            >
                              {exam.percentage}%
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${g.bg} ${g.border} ${g.text}`}
                          >
                            {exam.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 min-w-[120px]">
                          {exam.percentage !== null ? (
                            <div>
                              <MiniBar
                                value={exam.percentage}
                                color={
                                  exam.percentage >= 60
                                    ? "bg-emerald-500"
                                    : "bg-red-400"
                                }
                              />
                              <p className="text-[9px] text-gray-400 mt-1">
                                {exam.percentage >= 60 ? "Pass" : "Fail"} ·{" "}
                                {exam.percentage}% of 100%
                              </p>
                            </div>
                          ) : (
                            <span className="text-[10px] text-gray-300">
                              Not assessed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>
      )}

      {/* ══ SECTION 9 — Module Performance Table ════════════════════════════ */}
      {examResults.modulePerformance?.length > 0 && (
        <Section>
          <SectionTitle
            icon={Layers}
            title="Performance by Module"
            description="Aggregated scores across all exams per subject module, sorted by performance. Use this to identify which subjects need targeted support."
          />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-wider">
                    {[
                      { h: "Module", align: "text-left" },
                      { h: "Exams Sat", align: "text-center" },
                      { h: "Avg Score", align: "text-center" },
                      { h: "Avg Max", align: "text-center" },
                      { h: "Average %", align: "text-center" },
                      { h: "Trend bar", align: "text-left" },
                      { h: "Status", align: "text-center" },
                    ].map(({ h, align }) => (
                      <th
                        key={h}
                        className={`py-3.5 px-5 font-semibold ${align}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...(examResults.modulePerformance || [])]
                    .sort((a: any, b: any) => b.pct - a.pct)
                    .map((mod: any, i: number) => (
                      <tr
                        key={i}
                        className="border-t border-gray-50 hover:bg-indigo-50/20 transition-colors"
                      >
                        <td className="py-3.5 px-5">
                          <p className="text-sm font-semibold text-gray-800">
                            {mod.moduleName}
                          </p>
                        </td>
                        <td className="py-3.5 px-5 text-center text-sm text-gray-600">
                          {mod.attempts}
                        </td>
                        <td className="py-3.5 px-5 text-center text-sm font-mono text-gray-700">
                          {mod.avgScore}
                        </td>
                        <td className="py-3.5 px-5 text-center text-sm font-mono text-gray-400">
                          {mod.avgTotal}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <span
                            className={`text-sm font-bold ${mod.pct >= 60 ? "text-emerald-600" : "text-red-500"}`}
                          >
                            {mod.pct}%
                          </span>
                        </td>
                        <td className="py-3.5 px-5 min-w-[120px]">
                          <MiniBar
                            value={mod.pct}
                            color={
                              mod.pct >= 60 ? "bg-emerald-500" : "bg-red-400"
                            }
                          />
                          <p className="text-[9px] text-gray-400 mt-1">
                            {mod.pct}% of full marks
                          </p>
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${mod.pct >= 60 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                          >
                            {mod.pct >= 60 ? "Passing" : "Needs help"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <CardDivider label="How to use this table" />
            <CardBody>
              <Callout type="info">
                Sort order is highest to lowest performance. Modules marked
                &ldquo;Needs help&rdquo; score below 60% — consider targeted
                revision, additional practice sets, or one-on-one sessions for
                those subjects.
              </Callout>
            </CardBody>
          </Card>
        </Section>
      )}
    </div>
  );
}
