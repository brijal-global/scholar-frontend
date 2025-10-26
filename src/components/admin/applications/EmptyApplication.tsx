import OopsImage from "@/assets/illustrations/Oops.svg";
import Image from "next/image";
import Link from "next/link";

export default function EmptyApplication() {
  return (
    <div className="flex items-center justify-center flex-grow w-full">
      <div className="flex flex-col gap-5 text-center items-center justify-center w-full md:w-2/5 px-4">
        <Image src={OopsImage} alt="Oops Image" />
        <p className="text-gray-700">
          No applications available. Once a student submits their visa or
          university application, it will appear here for your review.
        </p>
        <Link
          href="/admin/dashboard"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
}
