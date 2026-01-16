import { CardTitle } from "@/components/Card";
import { WalletMinimal } from "lucide-react";
import Link from "next/link";

function FormTitle() {
  return (
    <CardTitle className="mx-auto text-2xl text-primary">
      <Link href="/" className="flex gap-2">
        <WalletMinimal />
        <p>Kosten</p>
      </Link>
    </CardTitle>
  )
}

export { FormTitle };
