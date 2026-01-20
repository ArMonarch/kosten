"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useUserStore } from "@/store/user";
import { ApiResponse } from "@/types/response";
import { SignInForm, SignInFormError } from "@/types/signinForm";
import { User } from "@/types/user";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

type InputChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type ButtonHandler = MouseEventHandler<HTMLButtonElement>;

function LoginForm() {
  const [signinForm, update_signinForm] = useState<SignInForm>(new SignInForm);
  const [signinFormError, update_signinFormError] = useState<SignInFormError>(new SignInFormError);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);
  const login = useUserStore((state) => (state.login));
  const router = useRouter();

  const handleinput: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    update_signinForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: ButtonHandler = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const response = await axios.post<ApiResponse<User>>("http://127.0.0.1:8080/api/auth/signin", {
        email: signinForm.email,
        password: signinForm.password,
      });
      update_signinFormError({ email: null, password: null });
      seterror(null);

      login(response.data.data);
      router.replace("/dashboard/dashboard");
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error
          const status = err.status;
          switch (status) {
            case 400:
              seterror(err.response?.data?.message);
              update_signinFormError((prev) => ({ ...prev, ...err.response?.data?.errors }));
              break;
            case 401:
              seterror(err.response?.data?.message);
              update_signinFormError((prev) => ({ ...prev, ...err.response?.data?.errors }));
              break;
            case 409:
              seterror(err.response?.data?.message);
              update_signinFormError({ email: null, password: null });
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
            type="password"
            required
          />
          <Label className="text-primary">{signinFormError.password ? signinFormError.password : null}</Label>
        </div>

        <div className="grid gap-2 px-5">
          <Label className="text-primary">{error ? error : null}</Label>
          <Button variant="outline" className="rounded-xl hover:bg-primary!" type="button" onClick={handleSubmit}
            disabled={loading} >Submit</Button>
        </div>
      </div>
    </form>
  )
}

export { LoginForm };
