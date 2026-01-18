"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useUserStore } from "@/store/user";
import { SignInForm, SignInFormError } from "@/types/signinForm";
import { User } from "@/types/user";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState } from "react";

type InputChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type ButtonHandler = MouseEventHandler<HTMLButtonElement>;

function LoginForm() {
  const [signinForm, update_signinForm] = useState<SignInForm>(new SignInForm);
  const [signinFormError, update_signinFormError] = useState<SignInFormError>(new SignInFormError);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);
  const login = useUserStore((state) => (state.login));

  const handleinput: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    update_signinForm((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);
  };
  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    handleValidation(name, value);
  };

  const handleSubmit: ButtonHandler = async (event) => {
    event.preventDefault();
    setloading(true);

    Object.entries(signinForm).forEach(([name, value]) => {
      handleValidation(name, value);
    });
    if (signinFormError.email || signinFormError.password) return;

    try {
      const response = await axios.post<User>("http://127.0.0.1:8080/api/auth/signin", {
        email: signinForm.email,
        password: signinForm.password,
      });
      login(response.data);
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error
          const status = err.status;
          switch (status) {
            case 401:
              seterror(err.response?.data?.message);
              update_signinFormError((prev) => ({ ...prev, ...err.response?.data?.errors }));
              break;
            case 409:
              seterror(err.response?.data?.message);
              break;
            default:
              seterror("Server error. Please try again later.");
          }
        } else if (err.request) {
          seterror("Network error. Please check your connection and try again.");
        }
      }
    }
    setloading(false);
  };

  function handleValidation(name: string, value: string) {
    seterror(null);
    switch (name) {
      case "email":
        if (value.trim() === "")
          update_signinFormError((prev) => ({ ...prev, "email": "Email must not be enpty" }))
        else if (value.length < 5)
          update_signinFormError((prev) => ({ ...prev, "email": "Email must at least be 5 character long" }))
        else update_signinFormError((prev) => ({ ...prev, "email": null }))
        break
      case "password":
        if (value.trim() === "")
          update_signinFormError((prev) => ({ ...prev, "password": "Password must not be empty" }))
        else if (value.length < 8)
          update_signinFormError((prev) => ({ ...prev, "password": "Password must at least be 8 long" }))
        else update_signinFormError((prev) => ({ ...prev, "password": null }))
        break
      default:
        break
    }

  }

  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={signinForm.email}
            onChange={handleinput}
            onBlur={handleBlur}
            type="email"
            placeholder="hello@example.com"
            required
          />
          <Label className="text-primary">{signinFormError.email ? signinFormError.email : null}</Label>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            value={signinForm.password}
            onChange={handleinput}
            onBlur={handleBlur}
            type="password"
            required
          />
          <Label className="text-primary">{signinFormError.password ? signinFormError.password : null}</Label>
        </div>

        <div className="grid gap-2 px-5">
          <Label className="text-primary">{error ? error : null}</Label>
          <Button variant="outline" className="rounded-xl hover:bg-primary!" type="button" onClick={handleSubmit}
            disabled={error != null || signinFormError.email != null || signinFormError.password != null || loading == true} >Submit</Button>
        </div>
      </div>
    </form>
  )
}

export { LoginForm };
