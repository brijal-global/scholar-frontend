"use client";

import Cover from "@/components/auth/Cover";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen items-center">
      <Cover />
      {children}
    </section>
  );
};

export default AuthLayout;
