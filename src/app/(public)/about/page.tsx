import Link from "next/link";
import {
  Lightbulb,
  ShieldCheck,
  Sparkles,
  HeadsetIcon,
  Target,
  BookOpen,
  BarChart3,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously evolve our platform with modern technology to stay ahead of educational needs.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Built for scale and uptime, ensuring your institution runs without interruption.",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "Intuitive interfaces that require minimal training so your team can focus on education.",
  },
  {
    icon: HeadsetIcon,
    title: "Support",
    description:
      "Dedicated support team ready to help you every step of the way, from setup to daily operations.",
  },
];

const capabilities = [
  {
    icon: Users,
    title: "Student & Faculty Management",
    description:
      "Centralize all student and staff records with comprehensive profile management and role-based access.",
  },
  {
    icon: BookOpen,
    title: "Academic Operations",
    description:
      "Manage programs, courses, batches, and curricula with a flexible structure that adapts to any institution.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Make data-driven decisions with real-time dashboards, performance analytics, and exportable reports.",
  },
  {
    icon: Target,
    title: "Attendance & Assessments",
    description:
      "Track attendance, schedule exams, and publish results seamlessly across all departments.",
  },
];

const AboutPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-br from-primary to-primary-dark text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Scholar</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Empowering educational institutions with the tools they need to
            deliver better outcomes for students and educators alike.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              At Scholar, we believe technology should simplify education — not
              complicate it. Our mission is to empower colleges and universities
              with an intuitive, all-in-one platform that streamlines academic
              management, reduces administrative burden, and helps institutions
              focus on what truly matters: delivering quality education.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Scholar provides a comprehensive suite of tools for every aspect
              of institutional management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 flex gap-5"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The principles that guide everything we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Scholar is built by Brijal Maharjan. — a software engineer who
            understands the challenges of running an institution.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start Your Journey with Scholar
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Experience how Scholar can transform the way your institution
            operates.
          </p>
          <Link
            href="/auth/sign-in"
            className="inline-block bg-primary text-white px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
