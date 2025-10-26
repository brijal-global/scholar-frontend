"use client";

import ResetPassword from "@/assets/illustrations/Reset password-pana 1.svg";
import Image from "next/image";
import Link from "next/link";

const PasswordChanged = () => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-lg font-semibold">
        Your password has been updated successfully.
      </p>
      <p className="text-blackish text-sm text-center">
        {" "}
        You can now log in with your new password.
      </p>
      <Image src={ResetPassword} alt="Mail Sent" width={400} height={400} />

      <div className="w-full flex items-center justify-center gap-2">
        <Link
          href="/auth"
          className="w-full p-3 rounded-md text-white bg-primary text-sm font-medium text-blackish hover:bg-[#e0e0e0] transition-all cursor-pointer text-center"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default PasswordChanged;
