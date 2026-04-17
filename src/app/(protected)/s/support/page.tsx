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
                How do I check my attendance?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Navigate to Attendance from the sidebar to view your complete
                attendance records with dates and times.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                Where can I see my exam results?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Go to Results from the sidebar to view your marks for each exam
                module along with any teacher remarks.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                How do I view my class schedule?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                Click on Schedule in the sidebar to see all your upcoming and
                weekly classes with timings and module details.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-700 font-medium hover:text-primary">
                What does the My Progress page show?
              </summary>
              <p className="mt-2 text-gray-500 pl-4">
                My Progress provides an overview of your academic performance
                including attendance count, average marks, and remarks summary.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
