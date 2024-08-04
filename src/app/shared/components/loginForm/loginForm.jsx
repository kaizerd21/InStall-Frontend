import { Button } from "primereact/button";

import { InputField } from "../inputFields/inputFields";

export function LoginForm() {
  return (
    <div className="flex w-[40%] flex-col">
      <div className="bg-slate-100 h-40 mb-10"></div>
      <div className="w-full flex flex-col justify-between">
        <InputField name="username" placeholder="Username" icon="pi-user" />
        <InputField
          name="password"
          placeholder="Password"
          type="password"
          icon="pi-lock"
        />
      </div>
      <div className="mt-2 w-full flex flex-col justify-between">
        {/* <PrimaryButton buttonText={"Log In"} /> */}
        <Button
          label="Log In"
          className="bg-primary hover:bg-primary_hover py-4 rounded-full shadow-lg text-white font-bold text-xl"
        />
      </div>
    </div>
  );
}
