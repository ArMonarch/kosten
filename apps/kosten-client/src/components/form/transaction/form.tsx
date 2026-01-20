import { Label } from "@/components/label";
import { TransactionCategorys } from "../common/transactionCategory";
import { Input } from "@/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { ChangeEventHandler, useState } from "react";
import { Button } from "@/components/button";

interface FormType {
  name: string;
  label: string;
  amount: number;
  transactionCategory: string;
  transactionType: "EXPENSE" | "INCOME";
}

type InputChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type OnValueChange = (name: string) => void;

function Form({ createFunction, varient }: { createFunction: (formstate: FormType) => Promise<void>, varient: "Expense" | "Income" | "Transaction" | "Dashboard" }) {
  if (varient === "Dashboard") return;
  const [formState, updateFormState] = useState<FormType>({ name: "", label: "", amount: 0, transactionCategory: "Food", transactionType: varient === "Income" ? "INCOME" : "EXPENSE" });
  const [err, setErr] = useState<string>("");

  const handleinput: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    updateFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange: OnValueChange = (name) => {
    updateFormState((prev) => ({ ...prev, transactionCategory: name }))
  }

  const handleTypeChange: OnValueChange = (name) => {
    let val: "INCOME" | "EXPENSE" = "INCOME";
    if (name === "Income") { }
    if (name === "Expense") { val = "EXPENSE"; }
    updateFormState((prev) => ({ ...prev, transactionType: val }))
  }

  async function handleSubmit() {
    try {
      setErr("");
      let amount = Number(formState.amount);
      if (Number.isNaN(amount) || amount <= 0) {
        setErr("Amount must be Number.");
        return
      }

      if (formState.name.trim().length == 0) { setErr("Name must not be empty"); return; }
      await createFunction(formState);
      const escEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        which: 27,
        bubbles: true,
      });

      document.dispatchEvent(escEvent);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <form>
      <div className="grid gap-3 relative">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formState.name} onChange={handleinput} placeholder="Bought a pair of shoes" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="label">Description</Label>
          <Input id="label" name="label" value={formState.label} onChange={handleinput} placeholder="...description" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="label">Amount</Label>
          <Input id="amount" name="amount" value={formState.amount} onChange={handleinput} placeholder="1000" />
        </div>
        <div className="grid grid-flow-col grid-rows-2 gap-3">
          <Label htmlFor="label">Category</Label>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {TransactionCategorys.map((val, key) => { return <SelectItem key={key} value={val}>{val}</SelectItem> })}
            </SelectContent>
          </Select>
          <Label htmlFor="label">Type</Label>
          <Select defaultValue={formState.transactionType} onValueChange={handleTypeChange} disabled={varient === "Expense" || varient === "Income"}>
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-primary">{err}</span>
        <Button variant="outline" className="absolute -bottom-[3.24rem] right-[5.2rem]" type="button" onClick={handleSubmit}>Create</Button>
      </div>
    </form>
  )
}

export { Form, type FormType };
