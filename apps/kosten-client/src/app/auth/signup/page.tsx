import { Card, CardContent, CardHeader } from "@/components/Card";
import { Base } from "@/components/form/common/base";
import { FormDescription } from "@/components/form/common/description";
import { Footer } from "@/components/form/common/footer";
import { FormTitle } from "@/components/form/common/title";
import { SignUpForm } from "@/components/form/signup/form";

function SignUp() {
  return (
    <Base>
      <Card className="bg-accent">
        <CardHeader className="flex flex-col justify-center">
          <FormTitle />
          <FormDescription>
            Enter your details below to create your account
          </FormDescription>
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
