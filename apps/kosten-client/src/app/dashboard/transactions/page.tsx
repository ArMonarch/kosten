"use client";
import { BaseDashboard } from "@/components/dashboard/base";
import { TransactionStat } from "@/components/dashboard/TransactionStat";
import { FormType } from "@/components/form/transaction/form";
import { MapTransaction } from "@/components/Map/default";
import { Separator } from "@/components/separator";
import { useAuth } from "@/hooks/useAuth";
import { useExpense } from "@/hooks/useExpense";
import { useIncome } from "@/hooks/useIncome";
import { useTransactions } from "@/hooks/useTransaction";

function Dashboard() {
  const { user, logout } = useAuth();
  const { transactions, createTransaction, deleteTransaction } = useTransactions();
  const { totalExpenseSum, totalExpenseCount, updateExpenseState } = useExpense();
  const { totalIncomeSum, totalIncomeCount, updateIncomeState } = useIncome();

  async function createTransactionNew(formData: FormType): Promise<void> {
    await createTransaction(formData);
    updateExpenseState()
    updateIncomeState();
  }

  async function deleteTransactionNew(transactionId: number): Promise<void> {
    await deleteTransaction(transactionId);
    updateExpenseState();
    updateIncomeState();
  }
  return (
    <BaseDashboard user={user} logout={logout} varient="Transaction" createFunction={createTransactionNew}>
      <Separator className="mt-1 bg-primary" />
      <TransactionStat income={{ totalSum: totalIncomeSum, totalCount: totalIncomeCount }} expense={{ totalSum: totalExpenseSum, totalCount: totalExpenseCount }} />
      <Separator className="mt-3 bg-primary" />
      <MapTransaction transaction={transactions} deleteTransaction={deleteTransactionNew} />
    </BaseDashboard>
  )
}

export default Dashboard;
