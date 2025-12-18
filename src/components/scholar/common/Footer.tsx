/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { footerLinks } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="bg-[#F8F8F8] text-[#838383] py-2 w-full text-xs">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((item: any) => (
            <Link
              key={item.id}
              href={item.href}
              className="hover:text-gray-700 transition-all p-2"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <span>
          &copy; {new Date()?.getFullYear() || 2026} Scholar. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
