import { Card, CardContent, CardDescription, CardHeader } from "@/components/card";
import { Base } from "@/components/form/common/base";
import { Footer } from "@/components/form/common/footer";
import { FormTitle } from "@/components/form/common/title";
import { SignUpForm } from "@/components/form/signup/form";

function SignUp() {
  return (
    <Base>
      <Card className="bg-accent">
        <CardHeader className="flex flex-col justify-center">
          <FormTitle />
          <CardDescription className="text-black text-center mx-auto">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <Footer varient="signup" />
      </Card>
    </Base>
  )
}

export default SignUp;
