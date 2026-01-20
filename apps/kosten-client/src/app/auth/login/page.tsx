import { Card, CardContent, CardDescription, CardHeader } from "@/components/card";
import { Base } from "@/components/form/common/base";
import { Footer } from "@/components/form/common/footer";
import { FormTitle } from "@/components/form/common/title";
import { LoginForm } from "@/components/form/login/form";

function Login() {
  return (
    <Base>
      <Card className="bg-accent">
        <CardHeader className="flex flex-col justify-center">
          <FormTitle />
          <CardDescription className="text-black text-center mx-auto">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <Footer varient="login" />
      </Card>
    </Base>
  )
}

export default Login;
