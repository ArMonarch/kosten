"use client";
import { BaseDashboard } from "@/components/dashboard/base";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <BaseDashboard user={user} logout={logout} varient="Dashboard">
      <div className="w-full h-50 flex flex-row gap-2 justify-center items-center text-4xl font-bold">
        <span>
          Welcome,
        </span>
        <span className="text-primary italic">
          {user?.name}
        </span>
        <span>!</span>
      </div>
      <div className="w-full">
        <Link href="/dashboard/transactions">
          <div className="flex flex-row items-center font-bold justify-center gap-2 text-4xl text-primary hover:underline">
            Go to Transaction
            <ArrowRight size={30} />
          </div>
        </Link>
      </div>
    </BaseDashboard>
  )
}

export default Dashboard;
