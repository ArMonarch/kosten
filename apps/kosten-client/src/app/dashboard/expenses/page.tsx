"use client";
import { BaseDashboard } from "@/components/dashboard/base";
import { TransactionStat } from "@/components/dashboard/TransactionStat";
import { MapTransaction } from "@/components/Map/default";
import { Separator } from "@/components/separator";
import { useAuth } from "@/hooks/useAuth";
import { useExpense } from "@/hooks/useExpense";

function Dashboard() {
  const { user, logout } = useAuth();
  const { expenses, totalExpenseSum, totalExpenseCount, createExpense, deleteExpense } = useExpense();

  return (
    <BaseDashboard user={user} logout={logout} varient="Expense" createFunction={createExpense}>
      <div className="flex flex-col w-full">
        <Separator className="mt-1 bg-primary" />
        <TransactionStat expense={{ totalSum: totalExpenseSum, totalCount: totalExpenseCount }} />
        <Separator className="mt-3 bg-primary" />
        <MapTransaction transaction={expenses} deleteTransaction={deleteExpense} />
      </div>
    </BaseDashboard>
  )
}

export default Dashboard;
