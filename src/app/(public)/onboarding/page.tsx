"use client";

import Image from "next/image";
import { CheckCircle, Mail, Clock } from "lucide-react";

const OnboardingPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#F1F1F1] p-4 md:p-8">
      {/* Logo and Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Image
            src="/logo.png"
            alt="Scholar Logo"
            width={80}
            height={80}
            className="animate-pulse"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blackish mb-2">
          Scholar
        </h1>
        <p className="text-grayish text-base md:text-lg">
          Your gateway to Korean universities
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary-light rounded-full p-6">
            <CheckCircle className="w-16 h-16 text-primary" strokeWidth={2} />
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blackish mb-4">
            Welcome Aboard! 🎉
          </h2>
          <p className="text-lg text-grayish mb-6">We&apos;re Coming Soon</p>
          <div className="bg-primary-light rounded-xl p-6 mb-6">
            <p className="text-base md:text-lg text-blackish leading-relaxed">
              Thank you for signing up! We&apos;re excited to have you join us
              on this journey. Our team is currently preparing your personalized
              experience.
            </p>
          </div>
          <p className="text-base text-grayish">
            We will reach out to you soon with next steps and important
            information about your study abroad journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blackish mb-1">
                Check Your Email
              </h3>
              <p className="text-sm text-grayish">
                We&apos;ll send you updates and important notifications
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blackish mb-1">Stay Tuned</h3>
              <p className="text-sm text-grayish">
                Our team will contact you within 24-48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-blackish mb-4 text-center">
            What Happens Next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                1
              </div>
              <p className="text-sm text-grayish pt-0.5">
                You&apos;ll receive a personalized email with your dashboard
                access
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                2
              </div>
              <p className="text-sm text-grayish pt-0.5">
                Start exploring Korean universities and begin your application
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-grayish">
          Have questions?{" "}
          <a
            href="mailto:support@Scholar.com"
            className="text-primary hover:text-primary-dark font-medium underline"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
