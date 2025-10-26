/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "@ant-design/v5-patch-for-react-19";

import { unstableSetRender } from "antd";
import { createRoot } from "react-dom/client";

unstableSetRender((node, container: any) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

export default function AntdProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
