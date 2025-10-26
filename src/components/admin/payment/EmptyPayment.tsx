import OopsImage from "@/assets/illustrations/Oops.svg";
import Image from "next/image";
import Link from "next/link";

export default function EmptyPayment() {
  return (
    <div className="flex items-center justify-center flex-grow w-full">
      <div className="flex flex-col gap-5 text-center items-center justify-center w-full md:w-2/5 px-4">
        <Image src={OopsImage} alt="Oops Image" />
        <p className="text-gray-700">
          No payments recorded yet. Payments will appear once students or
          consultancy make transactions
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
