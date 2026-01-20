import { Transaction } from "@/types/transaction";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/response";
import { deleteTransactionRaw } from "./useTransaction";
import { FormType } from "@/components/form/transaction/form";

async function getIncomes(user: User): Promise<Array<Transaction>> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<Transaction[]>>(
      "http://127.0.0.1:8080/api/transaction/income/get",
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
    return Promise.reject("Failed to load income");
  }
}

async function getIncomeSum(user: User): Promise<number> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<number>>(
      "http://127.0.0.1:8080/api/transaction/income/total/sum",
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject("Failed to load transaction");
  }
}

async function getIncomeCount(user: User): Promise<number> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<number>>(
      "http://127.0.0.1:8080/api/transaction/income/total/count",
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject("Failed to load transaction");
  }
}

async function createIncomeRaw(
  user: User,
  formData: FormType,
): Promise<Transaction> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.post<ApiResponse<Transaction>>(
      "http://127.0.0.1:8080/api/transaction/income/create",
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

function useIncome() {
  const [incomes, updateIncomes] = useState<Array<Transaction>>([]);
  const [totalIncomeSum, updateTotalSum] = useState<number>(0);
  const [totalIncomeCount, updateTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false); // Fix 2: Add loading state
  const [error, setError] = useState<string | null>(null); // Fix 3: Add error state
  const { user } = useAuth();

  const [up, setUp] = useState(true);
  function updateIncomeState() {
    setUp((prev) => !prev);
  }

  async function deleteIncome(transactionId: number) {
    if (user) {
      await deleteTransactionRaw(user, transactionId);
      setLoading(true);
      updateIncomeState();
      setLoading(false);
    }
  }

  async function createIncome(formstate: FormType) {
    if (user) {
      const expense = await createIncomeRaw(user, formstate);
      updateIncomeState();
    }
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      if (user) {
        try {
          setLoading(true);
          setError(null);
          const data = await getIncomes(user); // Await the promise
          updateIncomes(data);
          const totalSum = await getIncomeSum(user);
          updateTotalSum(totalSum);
          const totalCount = await getIncomeCount(user);
          updateTotalCount(totalCount);
        } catch (err) {
          console.error("Failed to fetch Incomes:", err);
          setError("Failed to load incomes");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchExpenses();
  }, [user?.id, up]);

  return {
    incomes,
    totalIncomeSum,
    totalIncomeCount,
    createIncome,
    deleteIncome,
    updateIncomeState,
    loading,
    error,
  };
}

export { useIncome };
