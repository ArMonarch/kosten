class SignInForm {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}

class SignInFormError {
  email: string | null;
  password: string | null;

  constructor() {
    this.email = null;
    this.password = null;
  }
}

export { SignInForm, SignInFormError };
