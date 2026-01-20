import { prettyDate, Transaction } from "@/types/transaction";
import { Card, CardContent, CardDescription, CardTitle } from "../card";
import { Dot, EllipsisVertical } from "lucide-react";
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuItem } from "../dropdown";

function LocalCardTitle({ index, val, deleteTransaction }: { index: number, val: Transaction, deleteTransaction: (transactionId: number) => Promise<void> }) {
  return (
    <CardTitle className="flex flex-row justify-between text-xl">
      <div>
        {index + 1}. {val.name}
      </div>
      <div className="flex flex-row gap-3">
        {
          val.transactionType == "INCOME" ?
            <div className="flex flex-row gap-1 items-center justify-center text-green-400 italic text-lg">+ ${val.amount}</div> :
            <div className="flex flex-row gap-1 items-center justify-center text-red-400 italic text-lg">- ${val.amount}</div>
        }
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full"><EllipsisVertical /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl">
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-xl" onClick={() => { deleteTransaction(val.id); }}>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardTitle>
  )
}

function MapTransaction({ transaction, deleteTransaction }: { transaction: Transaction[], deleteTransaction: (transactionId: number) => Promise<void> }) {
  return (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 py-3">
    {
      transaction.map((val, key) => {
        return <div key={key}>
          {/* Individual Cards */}
          <Card className="px-3 py-3">
            {/* Local Card Title  */}
            <LocalCardTitle index={key} val={val} deleteTransaction={deleteTransaction} />
            <CardContent className="flex flex-row justify-between items-center">
              <div className="flex flex-col text-left">
                <div>
                  Category
                </div>
                <div>
                  {val.transactionCategory}
                </div>
              </div>

              <Dot className="text-primary" size={32} />
              <Dot className="text-primary" size={32} />

              <div className="flex flex-col text-right">
                <div>
                  Date
                </div>
                <div>
                  {prettyDate(val.transactionDate)}
                </div>
              </div>
            </CardContent>
            <CardDescription>{val.label ? val.label : null}</CardDescription>
          </Card>
        </div>

      })
    }
  </div>)
}

export { MapTransaction };
