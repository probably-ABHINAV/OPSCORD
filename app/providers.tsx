"use client";

import React from "react";

// Stack Auth provider — uncomment once you have valid keys
// import { StackProvider } from "@stackframe/stack";
// import { stackApp } from "@/lib/stackApp";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Wrap with StackProvider once keys are configured:
          <StackProvider app={stackApp}>{children}</StackProvider> */}
      {children}
    </>
  );
}
