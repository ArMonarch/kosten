import { CardDescription } from "@/components/Card";
import React from "react";

function FormDescription({ children }: { children: React.ReactNode }) {
  return (
    <CardDescription className="text-black text-center mx-auto">
      {children}
    </CardDescription>
  )
}

export { FormDescription };
