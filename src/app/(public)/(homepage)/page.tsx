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
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description:
      "Manage student enrollment, profiles, and academic records in one centralized platform.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Tracking",
    description:
      "Track attendance efficiently with real-time reporting and automated notifications.",
  },
  {
    icon: FileText,
    title: "Exam Management",
    description:
      "Create, schedule, and manage examinations with flexible grading configurations.",
  },
  {
    icon: BarChart3,
    title: "Result Analytics",
    description:
      "Gain insights with comprehensive analytics on student performance and trends.",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description:
      "Organize courses, assign faculty, and manage curricula across departments.",
  },
  {
    icon: CalendarDays,
    title: "Class Scheduling",
    description:
      "Build conflict-free schedules and manage timetables for all programs.",
  },
];

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up Your College",
    description:
      "Create your institution account in minutes and set up your organization profile.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure Programs",
    description:
      "Set up your programs, courses, batches, and academic structure to match your needs.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Start Managing",
    description:
      "Invite staff and students, manage attendance, exams, and results — all from one place.",
  },
];

const stats = [
  { icon: School, value: "500+", label: "Colleges" },
  { icon: Users, value: "50,000+", label: "Students" },
  { icon: Monitor, value: "1M+", label: "Classes Managed" },
  { icon: Clock, value: "99.9%", label: "Uptime" },
];

const Homepage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary-dark to-[#013a59] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Transform Your Institution
            <br />
            <span className="text-secondary">with Scholar</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform to manage education seamlessly — from
            enrollment and attendance to exams and results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/sign-in"
              className="bg-secondary text-gray-900 px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-yellow-400 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="border border-white/30 text-white px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Education
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Powerful tools designed to simplify every aspect of institutional
              management.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-5">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Setting up Scholar for your institution is quick and
              straightforward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-light mb-6">
                    <Icon className="text-primary" size={28} />
                    <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-secondary text-gray-900 text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

      {/* Stats */}
      <section className="bg-primary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="text-secondary mx-auto mb-3" size={28} />
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-blue-200">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Join hundreds of colleges already using Scholar to streamline their
            academic operations.
          </p>
          <Link
            href="/auth/sign-in"
            className="inline-block bg-primary text-white px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </>
  );
};

export default Homepage;
