import { Button } from "primereact/button";
import Logo from "../../../../assets/img/logo_only.png";

import { InputField } from "../inputFields/inputFields";
import { useState } from "react";
import { handleSignin } from "../../../core/utilities/handleAuth";

import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { success } = handleSignin(userData);
    if (success) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="flex w-[30%] flex-col">
      <div className="space-y-4 mb-10">
        <div className="flex justify-center">
          <img src={Logo} alt="InStall Logo" className="w-[50%]" />
        </div>
        <h1 className="font-extrabold text-center text-3xl text-primary_text">
          InStall
        </h1>
      </div>
      <div className="w-full flex flex-col justify-between">
        <InputField
          handleInput={handleInput}
          name="email"
          placeholder="Email"
          type="email"
          icon="pi-user"
          className="bg-inputfield_color text-secondary px-4 py-4 mb-5 rounded-full shadow-md"
        />
        <InputField
          handleInput={handleInput}
          name="password"
          placeholder="Password"
          type="password"
          icon="pi-lock"
          className="bg-inputfield_color text-secondary px-4 py-4 mb-5 rounded-full shadow-md"
        />
      </div>
      <div className="w-full flex flex-col justify-between">
        {/* <PrimaryButton buttonText={"Log In"} /> */}
        <Button
          label="Log In"
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary_hover py-4 rounded-full shadow-lg text-white font-bold text-xl"
        />
      </div>
    </div>
  );
}
