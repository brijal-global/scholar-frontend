"use client";

import { Mail, Phone, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Help & Support
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Need help? Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-6 space-y-3">
          <div className="p-2 rounded-lg bg-primary-light w-fit">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-medium text-gray-900">Email Support</h3>
          <p className="text-sm text-gray-500">
            Send us an email and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="mailto:support@scholar.com"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            support@scholar.com
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 space-y-3">
          <div className="p-2 rounded-lg bg-primary-light w-fit">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-medium text-gray-900">Phone Support</h3>
          <p className="text-sm text-gray-500">
            Call us during business hours for immediate assistance.
          </p>
          <p className="text-sm text-gray-700">Mon - Fri, 9:00 AM - 6:00 PM</p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 space-y-3 md:col-span-2">
          <div className="p-2 rounded-lg bg-primary-light w-fit">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-medium text-gray-900">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3 text-sm">
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                How do I add a new program?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Navigate to Programs from the sidebar, then click &quot;Create
                New&quot; to add a new program with details like name, code,
                level, and credits.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                How do I take attendance?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Go to Attendance from the sidebar, select a group and date, mark
                students as present using the checkboxes, and click Submit.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                How do I manage exam results?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Navigate to Results, select an exam and exam module, then enter
                marks for each student and save.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                How do I set up role-based permissions?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Go to Role Groups to create custom role groups, then assign
                permissions through the admin panel. Employees can be assigned
                to role groups when adding or editing them.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
