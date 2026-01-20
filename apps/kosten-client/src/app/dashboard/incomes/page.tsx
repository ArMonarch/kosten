"use client";
import { BaseDashboard } from "@/components/dashboard/base";
import { TransactionStat } from "@/components/dashboard/TransactionStat";
import { MapTransaction } from "@/components/Map/default";
import { Separator } from "@/components/separator";
import { useAuth } from "@/hooks/useAuth";
import { useIncome } from "@/hooks/useIncome";

function Dashboard() {
  const { user, logout } = useAuth();
  const { incomes, totalIncomeSum, totalIncomeCount, createIncome, deleteIncome } = useIncome();

  return (
    <BaseDashboard user={user} logout={logout} varient="Income" createFunction={createIncome}>
      <Separator className="mt-1 bg-primary" />
      <TransactionStat income={{ totalSum: totalIncomeSum, totalCount: totalIncomeCount }} />
      <Separator className="mt-3 bg-primary" />
      <MapTransaction transaction={incomes} deleteTransaction={deleteIncome} />
    </BaseDashboard>
  )
}

export default Dashboard;
