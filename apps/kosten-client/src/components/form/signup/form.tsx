"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useUserStore } from "@/store/user";
import { SignUpForm, SignUpFormError } from "@/types/signupForm";
import { User } from "@/types/user";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState } from "react";

type InputChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type ButtonHandler = MouseEventHandler<HTMLButtonElement>;

function Form() {
  const [signupForm, update_signupForm] = useState<SignUpForm>(new SignUpForm);
  const [signupFormError, update_signupFormError] = useState<SignUpFormError>(new SignUpFormError);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);
  const login = useUserStore((state) => (state.login));

  const handleinput: InputChangeHandler = (event) => {
    const { name, value } = event.target;
    update_signupForm((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);
  };
  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    handleValidation(name, value);

  };
  const handleSubmit: ButtonHandler = async (event) => {
    event.preventDefault();
    Object.entries(signupForm).forEach(([name, value]) => {
      handleValidation(name, value);
      if (name == "confirmPassword" && value != signupForm.password) return;
    });
    if (signupFormError.name || signupFormError.email || signupFormError.password) return;

    setloading(true);
    try {
      const response = await axios.post<User>("http://127.0.0.1:8080/api/auth/signup", {
        email: signupForm.email,
        name: signupForm.name,
        password: signupForm.password,
      });
      login(response.data);
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
      case "name":
        if (value.trim() === "")
          update_signupFormError((prev) => ({ ...prev, "name": "Name must not be empty" }))
        else if (value.length < 3 || 20 < value.length)
          update_signupFormError((prev) => ({ ...prev, "name": "Name must be 3 - 20 character long" }))
        else update_signupFormError((prev) => ({ ...prev, "name": null }))
        break

      case "email":
        if (value.trim() === "")
          update_signupFormError((prev) => ({ ...prev, "email": "Email must not be enpty" }))
        else if (value.length < 5)
          update_signupFormError((prev) => ({ ...prev, "email": "Email must at least be 5 character long" }))
        else update_signupFormError((prev) => ({ ...prev, "email": null }))
        break

      case "password":
        if (value.trim() === "")
          update_signupFormError((prev) => ({ ...prev, "password": "Password must not be empty" }))
        else if (value.length < 8)
          update_signupFormError((prev) => ({ ...prev, "password": "Password must at least be 8 long" }))
        else update_signupFormError((prev) => ({ ...prev, "password": null }))
        break
      default:
        break
    }
  }

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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
            required
          />
          <Label className="text-primary">{signupFormError.password ? signupFormError.password : null}</Label>
        </div>
      </div>

      <div className="grid gap-2 pt-7 px-5">
        <Label className="text-primary">{error ? error : null}</Label>
        <Button variant="outline" className="rounded-xl hover:bg-primary!" type="button" onClick={handleSubmit}
          disabled={error != null || signupFormError.name != null || signupFormError.email != null || signupFormError.password != null || loading == true}>Submit</Button>
      </div>
    </form>
  )
}

export { Form as SignUpForm };
