import Link from "next/link";
import Image from "next/image";
import { socialLinks, footerLinks } from "@/data/contact";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Scholar"
                width={30}
                height={30}
                className="rounded"
              />
              <span className="text-lg font-semibold text-primary-dark">
                Scholar
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/sign-in"
                className="text-sm text-primary font-medium hover:text-primary-dark transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-in"
                className="text-sm bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <Image
                  src="/logo.png"
                  alt="Scholar"
                  width={28}
                  height={28}
                  className="rounded"
                />
                <span className="text-lg font-semibold text-white">
                  Scholar
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400">
                Your partner for managing educational institutions. Built by
                Brijal Maharjan. to help colleges streamline programs, courses,
                students, and more.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">
                Connect With Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors ${social.bgClass}`}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Scholar by Brijal Maharjan. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
