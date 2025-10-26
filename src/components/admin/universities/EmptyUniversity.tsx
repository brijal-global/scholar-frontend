import OopsImage from "@/assets/illustrations/Oops.svg";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EmptyApplication() {
  return (
    <div className="flex items-center justify-center flex-grow w-full">
      <div className="flex flex-col gap-5 text-center items-center justify-center w-full md:w-2/5 px-4">
        <Image src={OopsImage} alt="Oops Image" />
        <p className="text-gray-700">
          You haven&apos;t added any universities to the platform. Start by
          adding a new university to manage programs, intakes, and applications.
        </p>
        <Link
          href="/admin/universities/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
        >
          <Plus className="w-5 h-5" />
          Add New University
        </Link>
      </div>
    </div>
  );
}
