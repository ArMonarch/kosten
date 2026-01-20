import { Card, CardTitle } from "../card";

type TransactionStatArgs = { expense?: { totalSum: number, totalCount: number }, income?: { totalSum: number, totalCount: number } };

function TransactionStat({ expense, income }: TransactionStatArgs) {
  return (
    <div className="flex flex-row gap-5 justify-center items-center mt-3">
      {
        income ?
          <div className="flex flex-row gap-5 justify-center items-center">
            <Card className="min-w-32 h-32 px-5 justify-center items-center">
              <CardTitle className="text-xl">
                <span>Total Income Sum</span>
                <div className="w-full text-center text-green-400"> +${income.totalSum}</div>
              </CardTitle>
            </Card>
            <Card className="min-w-32 h-32 px-5 justify-center items-center">
              <CardTitle className="text-xl">
                Total Income Count : {income.totalCount}
              </CardTitle>
            </Card>

          </div> :
          null
      }
      {
        expense ?
          <div className="flex flex-row gap-5 justify-center items-center">
            <Card className="min-w-32 h-32 px-5 justify-center items-center">
              <CardTitle className="text-xl">
                <span>Total Expense Sum</span>
                <div className="w-full text-center text-red-400"> -${expense.totalSum}</div>
              </CardTitle>
            </Card>
            <Card className="min-w-32 h-32 px-5 justify-center items-center">
              <CardTitle className="text-xl">
                Total Expense Count : {expense.totalCount}
              </CardTitle>
            </Card>

          </div> :
          null
      }
    </div>
  )
}

export { TransactionStat };
