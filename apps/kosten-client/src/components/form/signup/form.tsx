"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useUserStore } from "@/store/user";
import { ApiResponse } from "@/types/response";
import { SignUpForm, SignUpFormError } from "@/types/signupForm";
import { User } from "@/types/user";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

type InputChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type ButtonHandler = MouseEventHandler<HTMLButtonElement>;

function Form() {
  const [signupForm, update_signupForm] = useState<SignUpForm>(new SignUpForm);
  const [signupFormError, update_signupFormError] = useState<SignUpFormError>(new SignUpFormError);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);
  const login = useUserStore((state) => (state.login));
  const router = useRouter();

  const handleinput: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    update_signupForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit: ButtonHandler = async (event) => {
    event.preventDefault();

    setloading(true);
    try {
      const response = await axios.post<ApiResponse<User>>("http://127.0.0.1:8080/api/auth/signup", {
        email: signupForm.email,
        name: signupForm.name,
        password: signupForm.password,
      });
      update_signupFormError({ email: null, name: null, password: null });
      seterror(null)

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
              update_signupFormError((prev) => ({ ...prev, ...err.response?.data?.errors }));
              break;
            case 401:
              seterror(err.response?.data?.message);
              update_signupFormError((prev) => ({ ...prev, ...err.response?.data?.errors }));
              break;
            case 409:
              seterror(err.response?.data?.message);
              update_signupFormError({ email: null, name: null, password: null });
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Foo Bar"
            value={signupForm.name}
            onChange={handleinput}
            required
          />
          <Label className="text-primary">{signupFormError.name ? signupFormError.name : null}</Label>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="hello@example.com"
            value={signupForm.email}
            onChange={handleinput}
            required
          />
          <Label className="text-primary">{signupFormError.email ? signupFormError.email : null}</Label>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={signupForm.password}
            onChange={handleinput}
            required
          />
          <Label className="text-primary">{signupFormError.password ? signupFormError.password : null}</Label>
        </div>
      </div>

      <div className="grid gap-2 pt-7 px-5">
        <Label className="text-primary">{error ? error : null}</Label>
        <Button variant="outline" className="rounded-xl hover:bg-primary!" type="button" onClick={handleSubmit} disabled={loading}>Submit</Button>
      </div>
    </form>
  )
}

export { Form as SignUpForm };
