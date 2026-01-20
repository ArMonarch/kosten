import { Transaction } from "@/types/transaction";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/response";
import { deleteTransactionRaw } from "./useTransaction";
import { FormType } from "@/components/form/transaction/form";

async function getExpenses(user: User): Promise<Array<Transaction>> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<Transaction[]>>(
      "http://127.0.0.1:8080/api/transaction/expense/get",
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status == 404) {
        return Promise.resolve([]);
      }
    }
    return Promise.reject("Failed to load expense");
  }
}

async function getExpensesSum(user: User): Promise<number> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<number>>(
      "http://127.0.0.1:8080/api/transaction/expense/total/sum",
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject("Failed to load transaction");
  }
}

async function getExpensesCount(user: User): Promise<number> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<number>>(
      "http://127.0.0.1:8080/api/transaction/expense/total/count",
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject("Failed to load transaction");
  }
}

async function createExpenseRaw(
  user: User,
  formData: FormType,
): Promise<Transaction> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.post<ApiResponse<Transaction>>(
      "http://127.0.0.1:8080/api/transaction/expense/create",
      formData,
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject("Failed to load transaction");
  }
}

function useExpense() {
  const [expenses, updateExpenses] = useState<Array<Transaction>>([]);
  const [totalExpenseSum, updateTotalSum] = useState<number>(0);
  const [totalExpenseCount, updateTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [up, setUp] = useState(true);
  function updateExpenseState() {
    setUp((prev) => !prev);
  }

  async function createExpense(formstate: FormType) {
    if (user) {
      const expense = await createExpenseRaw(user, formstate);
      updateExpenseState();
    }
  }

  async function deleteExpense(transactionId: number) {
    if (user) {
      await deleteTransactionRaw(user, transactionId);
      setLoading(true);
      updateExpenseState();
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      if (user) {
        setLoading(true);
        try {
          setError(null);
          const data = await getExpenses(user); // Await the promise
          updateExpenses(data);
          const sum = await getExpensesSum(user);
          updateTotalSum(sum);
          const count = await getExpensesCount(user);
          updateTotalCount(count);
        } catch (err) {
          console.error("Failed to fetch expenses:", err);
          setError("Failed to load expenses");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchExpenses();
  }, [user?.id, up]);

  return {
    expenses,
    totalExpenseSum,
    totalExpenseCount,
    createExpense,
    deleteExpense,
    updateExpenseState,
    loading,
    error,
  };
}

export { useExpense };
