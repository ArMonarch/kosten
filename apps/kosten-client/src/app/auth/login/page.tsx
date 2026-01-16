import { Card, CardContent, CardHeader } from "@/components/Card";
import { Base } from "@/components/form/common/base";
import { FormDescription } from "@/components/form/common/description";
import { Footer } from "@/components/form/common/footer";
import { FormTitle } from "@/components/form/common/title";
import { LoginForm } from "@/components/form/login/form";

function Login() {
  return (
    <Base>
      <Card className="bg-accent">
        <CardHeader className="flex flex-col justify-center">
          <FormTitle />
          <FormDescription>
            Enter your email and password below to login to your account
          </FormDescription>
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
