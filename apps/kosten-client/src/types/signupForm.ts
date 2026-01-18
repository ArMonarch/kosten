class SignUpForm {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
  }
}

class SignUpFormError {
  name: string | null;
  email: string | null;
  password: string | null;

  constructor() {
    this.name = null;
    this.email = null;
    this.password = null;
  }
}

export { SignUpForm, SignUpFormError };
