import Link from "next/link";
import {
  GraduationCap,
  ClipboardCheck,
  FileText,
  BarChart3,
  BookOpen,
  CalendarDays,
  UserPlus,
  Settings,
  Rocket,
  School,
  Users,
  Monitor,
  Clock,
  Brain,
  TrendingUp,
  ShieldCheck,
  Building2,
  Layers,
  MessageSquare,
  Award,
  ChevronRight,
  Sparkles,
  LineChart,
  Target,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const aiFeatures = [
  {
    icon: Brain,
    title: "AI Performance Analytics",
    description:
      "TensorFlow-powered linear regression models analyse each student's attendance and exam trends to predict future performance and flag at-risk students early.",
    accent: "from-violet-500 to-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Predictive Trend Forecasting",
    description:
      "Real-time R² regression on monthly attendance and per-exam scores surfaces improving, stable, or declining trajectories — automatically.",
    accent: "from-indigo-500 to-cyan-600",
  },
  {
    icon: Target,
    title: "Risk Classification",
    description:
      "A weighted performance model (40% attendance · 50% exam scores · 10% remarks) assigns low / medium / high risk labels so advisors act before grades drop.",
    accent: "from-cyan-500 to-teal-600",
  },
  {
    icon: LineChart,
    title: "Interactive Dashboards",
    description:
      "Radar charts, line charts, bar charts, and doughnut charts give a 360-degree view of each student's academic health at a glance.",
    accent: "from-teal-500 to-green-600",
  },
];

const orgFeatures = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description:
      "Register students, manage enrollments, track attendance, and view full academic history.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Tracking",
    description:
      "Record and analyse daily attendance with a per-student calendar heatmap view.",
  },
  {
    icon: FileText,
    title: "Exam & Results",
    description:
      "Create exams, assign modules, enter marks, and auto-generate grade reports.",
  },
  {
    icon: BookOpen,
    title: "Programs & Modules",
    description:
      "Organise programs, batches, groups, and subject modules across academic years.",
  },
  {
    icon: CalendarDays,
    title: "Date wise attendance",
    description: "Track attendance on a per-date basis with a heatmap view.",
  },
  {
    icon: MessageSquare,
    title: "Student Remarks",
    description:
      "Teachers log academic, behavioural, and achievement remarks linked to each student.",
  },
  {
    icon: Layers,
    title: "Role-Based Access",
    description:
      "Custom college roles with fine-grained permissions control who sees and edits what.",
  },
  {
    icon: Building2,
    title: "College Profile",
    description:
      "Manage institutional details, branding, and load realistic test data instantly.",
  },
  {
    icon: Award,
    title: "Performance Reports",
    description:
      "Export per-student analytics dashboards for parent meetings and staff reviews.",
  },
];

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up Your College",
    description:
      "Create your institutional account and configure your college profile in minutes.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Set Up Academic Structure",
    description:
      "Add programs, batches, groups, and modules. Invite staff and enrol students.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Start Teaching & Tracking",
    description:
      "Record attendance, run exams, write remarks — and let AI do the analysis.",
  },
];

const stats = [
  { icon: School, value: "500+", label: "Colleges" },
  { icon: Users, value: "50,000+", label: "Students" },
  { icon: Monitor, value: "1M+", label: "Classes Managed" },
  { icon: Clock, value: "99.9%", label: "Uptime" },
];

// ── Components ────────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-indigo-100">
      <Sparkles size={12} />
      {text}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Homepage = () => {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-white/3 rotate-12 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Brain size={13} className="text-violet-300" />
              Powered by TensorFlow AI Analytics
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              The Smartest Way to
              <br />
              <span className="bg-linear-to-r from-cyan-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                Manage Your Institution
              </span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Scholar combines complete academic management with real-time
              AI-driven analytics — predicting student risks before they become
              failures.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/sign-in"
                className="group flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/30"
              >
                Get Started Free
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-2 border border-white/25 text-white/90 px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Hero stat chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-14">
            {[
              { icon: ShieldCheck, label: "SOC-2 Compliant" },
              { icon: Brain, label: "AI-Powered Analytics" },
              { icon: Users, label: "50,000+ Students" },
              { icon: Clock, label: "99.9% Uptime" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/8 border border-white/15 px-4 py-2 rounded-full text-xs text-white/80 backdrop-blur-sm"
              >
                <Icon size={13} className="text-violet-300" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Analytics Showcase ─────────────────────────────────────────── */}
      <section
        id="ai"
        className="py-24 md:py-32 bg-gray-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="AI & Machine Learning" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Student Performance Intelligence
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base">
              Every student gets a live analytics dashboard powered by
              TensorFlow regression models — built right into the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aiFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-white/25 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${f.accent} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${f.accent} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mini analytics preview panel */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-5">
              Example — Student Analytics Dashboard
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                {
                  label: "Attendance",
                  value: "82%",
                  sub: "164 days present",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  label: "Avg Exam Score",
                  value: "76%",
                  sub: "8 exams taken",
                  color: "from-indigo-500 to-violet-600",
                },
                {
                  label: "Remarks",
                  value: "14",
                  sub: "9 positive · 2 negative",
                  color: "from-cyan-500 to-teal-600",
                },
                {
                  label: "Streak",
                  value: "12d",
                  sub: "Max: 28 days",
                  color: "from-orange-500 to-red-500",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/8 rounded-xl p-4"
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-linear-to-r ${stat.color} mb-3`}
                  />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-white mt-0.5">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-400">
              <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                <p className="font-semibold text-white mb-1 text-sm">
                  Attendance Trend
                </p>
                <p className="text-green-400 flex items-center gap-1">
                  ↑ Improving · R² = 0.82
                </p>
                <p>
                  Predicted next month:{" "}
                  <span className="text-white font-semibold">85%</span>
                </p>
              </div>
              <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                <p className="font-semibold text-white mb-1 text-sm">
                  Exam Score Trend
                </p>
                <p className="text-amber-400 flex items-center gap-1">
                  → Stable · R² = 0.61
                </p>
                <p>
                  Predicted next score:{" "}
                  <span className="text-white font-semibold">74%</span>
                </p>
              </div>
              <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                <p className="font-semibold text-white mb-1 text-sm">
                  Risk Assessment
                </p>
                <p className="text-green-400">● Low Risk</p>
                <p>
                  Overall performance score:{" "}
                  <span className="text-white font-semibold">78 / 100</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Features ─────────────────────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Everything You Need" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Institutional Management
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every tool your college needs, unified in one platform — from
              first enrolment to graduation analytics.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {orgFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="text-indigo-600" size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Getting Started" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Up and Running in 3 Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No lengthy onboarding. Set up your institution and start managing
              in minutes.
            </p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-indigo-100" />
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 mb-6 shadow-sm">
                    <Icon className="text-indigo-600" size={26} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="text-white/70 mx-auto mb-3" size={28} />
                  <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-indigo-200">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI highlight band ────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-gray-950 to-indigo-950 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
                  <Sparkles size={12} />
                  TensorFlow-Powered
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Predict Student Success Before Problems Arise
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Our ML models run on real student data — attendance records,
                  exam scores, teacher remarks — and give every student a live
                  performance score and risk classification, updated in real
                  time.
                </p>
                <Link
                  href="/auth/sign-in"
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all"
                >
                  Try AI Analytics
                  <ChevronRight size={15} />
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: "Attendance trend regression",
                    value: "R² = 0.87",
                    trend: "up",
                    color: "text-green-400",
                  },
                  {
                    label: "Exam score prediction accuracy",
                    value: "± 4.2%",
                    trend: "up",
                    color: "text-green-400",
                  },
                  {
                    label: "At-risk students flagged early",
                    value: "95%+",
                    trend: "up",
                    color: "text-green-400",
                  },
                  {
                    label: "Module performance radar",
                    value: "6 modules",
                    trend: "flat",
                    color: "text-indigo-300",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-3"
                  >
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <span className={`text-sm font-semibold ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <SectionLabel text="Ready to Start?" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transform Your Institution Today
          </h2>
          <p className="text-gray-500 mb-8 text-base leading-relaxed">
            Join hundreds of colleges already using Scholar to manage academics,
            track attendance, run exams — and let AI predict student success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/sign-in"
              className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-indigo-200"
            >
              Get Started for Free
              <ChevronRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <Link
              href="#features"
              className="text-sm text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors"
            >
              See all features
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
