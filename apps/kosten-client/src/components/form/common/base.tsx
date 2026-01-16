import React from "react";

function Base({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Login Card - Takes 2/6 (1/3) of horizontal space, full vertical height */}
      <div className="w-full md:w-1/2 xl:w-2/6 bg-background flex flex-col justify-center px-3">
        {children}
      </div>
      {/* Right Side - Empty with gradient background */}
      <div className="w-0 md:w-1/2 xl:w-4/6 bg-gradient-to-br from-primary/60 to-secondary"></div>
    </div>
  )
}

export { Base };
