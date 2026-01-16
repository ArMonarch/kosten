import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@radix-ui/react-label";

function SignUpForm() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Foo Bar"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            required
          />
        </div>
      </div>

      <div className="grid gap-2 pt-7 px-5">
        <Button variant="outline" className="rounded-xl hover:bg-primary!">Submit</Button>
      </div>
    </form>
  )
}

export { SignUpForm };
