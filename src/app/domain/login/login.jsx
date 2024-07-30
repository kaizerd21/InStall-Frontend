import "./login.scss";
import { LoginForm } from "../../shared/components";

export function LoginPage() {
  return (
    <div className="main-page">
      <div className="login-img"></div>
      <div className="login">
        <LoginForm />
      </div>
    </div>
  );
}
