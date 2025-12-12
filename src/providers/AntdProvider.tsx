/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ConfigProvider } from "antd";

export default function AntdProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#006296",
            colorPrimaryHover: "#014b73",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
