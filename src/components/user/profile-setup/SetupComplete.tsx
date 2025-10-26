"use client";
import Image from "next/image";
import CompleteImage from "@/assets/illustrations/Completed-pana 1.svg";
import Link from "next/link";
import { School, UserRoundCheck } from "lucide-react";
import { RiFilePaper2Line } from "react-icons/ri";

export default function EducationalInformation() {
  return (
    <>
      <section className="p-10 rounded-xl">
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-3">Profile Setup Complete</h1>
          <p>You&apos;re all set to explore universities!</p>
        </div>
        <div className="flex justify-center">
          <Image
            src={CompleteImage}
            alt="Picture of completion"
            style={{
              width: "18rem",
              height: "30rem",
            }}
          />
        </div>
        <p className="text-center mb-5 font-light">What&apos;s next?</p>
        <div className="w-full flex justify-center space-x-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/universities"
              className="bg-[#CCF8E2] text-[#29935C] text-sm px-4 py-3 rounded-md cursor-pointer flex items-center gap-2 transition-colors max-md:w-full"
            >
              <School />
              Browse University
            </Link>
            <Link
              href="/applications"
              className="bg-[#CCF8E2] text-[#29935C] text-sm px-4 py-3 rounded-md cursor-pointer flex items-center gap-2 transition-colors max-md:w-full"
            >
              <RiFilePaper2Line />
              Start your application
            </Link>
            <Link
              href="/support/new"
              className="bg-[#CCF8E2] text-[#29935C] text-sm px-4 py-3 rounded-md cursor-pointer flex items-center gap-2 transition-colors max-md:w-full"
            >
              <UserRoundCheck />
              Connect with consultant
            </Link>
          </div>
        </div>
        <div className="w-full mt-5 flex justify-center">
          <Link
            href="/dashboard"
            className="bg-primary text-white text-sm px-4 py-3 rounded-md cursor-pointer flex items-center gap-2 transition-colors max-md:w-full"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </>
  );
}
