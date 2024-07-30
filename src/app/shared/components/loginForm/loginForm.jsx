import { PrimaryButton } from "../buttons/buttons";
import { InputField } from "../inputFields/inputFields";

import "./loginForm.scss";

export function LoginForm() {
  return (
    <div className="login-form">
      <div className="custom-form">
        <InputField placeholder={"ID Number"} />
        <InputField placeholder={"Password"} />
      </div>
      <div className="custom-btn">
        <PrimaryButton buttonText={"Log In"} />
      </div>
    </div>
  );
}
