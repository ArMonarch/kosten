import { Transaction } from "@/types/transaction";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/response";
import { FormType } from "@/components/form/transaction/form";

async function getTransactions(user: User): Promise<Array<Transaction>> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.get<ApiResponse<Transaction[]>>(
      "http://127.0.0.1:8080/api/transaction/get",
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
    return Promise.reject("Failed to load transaction");
  }
}

async function deleteTransactionRaw(
  user: User,
  transactionId: number,
): Promise<number> {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.delete<ApiResponse<any>>(
      `http://127.0.0.1:8080/api/transaction/delete/${transactionId}`,
      {
        headers: { Authorization: authHeader },
      },
    );
    return Promise.resolve(response.data.data);
  } catch (err) {
    return Promise.reject("Failed to delete transaction");
  }
}

async function createTransactionRaw(user: User, formData: FormType) {
  const authHeader = `Basic ${user?.id}:${user?.email}:${user?.hashedPassword}`;
  try {
    const response = await axios.post<ApiResponse<Transaction>>(
      "http://127.0.0.1:8080/api/transaction/create",
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

function useTransactions() {
  const [transactions, updateTransactions] = useState<Array<Transaction>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [up, setUp] = useState(true);
  function updateTransactionState() {
    setUp((prev) => !prev);
  }

  async function createTransaction(formstate: FormType) {
    if (user) {
      const expense = await createTransactionRaw(user, formstate);
      updateTransactionState();
    }
  }

  async function deleteTransaction(transactionId: number) {
    if (user) {
      setLoading(true);
      await deleteTransactionRaw(user, transactionId);
      updateTransactionState();
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      if (user) {
        try {
          setLoading(true);
          setError(null);
          const data = await getTransactions(user); // Await the promise
          updateTransactions(data);
        } catch (err) {
          console.error("Failed: ", err);
          setError("Failed to load transactions");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchExpenses();
  }, [user?.id, up]);

  return {
    transactions,
    createTransaction,
    deleteTransaction,
    updateTransactionState,
    loading,
    error,
  };
}

export { useTransactions, deleteTransactionRaw };
