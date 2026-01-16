import { CardFooter } from "@/components/Card";
import Link from "next/link";

function Footer({ varient }: { varient: "login" | "signup" }) {
  if (varient == "login") {
    return (
      <CardFooter className="flex-col gap-2">
        <p>
          Don't have an account?
          <Link href="/auth/signup" className="text-primary ml-1">Sign up</Link>
        </p>
      </CardFooter>
    );
  }
  else if (varient == "signup") {
    return (
      <CardFooter className="flex-col gap-2">
        <p>
          Already signed up?
          <Link href="/auth/login" className="text-primary ml-1">Go to Login</Link>
        </p>
      </CardFooter>
    );
  }
}

export { Footer };
