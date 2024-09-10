import axios from "axios";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

import { loginEmailRules, loginPasswordRules } from "../../core/form/form.rules";
import { InputField, PrimaryButton } from "../../shared/components";
import { loginFormDefaults } from "../../core/form/form-login-defaults";
import { useAxiosInstance } from "../../core/main-api";


export function LoginPage() {
  const navigate = useNavigate()
  const { customAxiosInstance } = useAxiosInstance()

  const BASE_URL = process.env.REACT_APP_BASE_URL


  const { register, handleSubmit } = useForm({
    defaults: loginFormDefaults,
  })

  const handleLogin = async (data) => {
    await axios.post(`${BASE_URL}/auth/signin`, data).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        customAxiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
        navigate(`/management`)
      }
    }).catch(err => {
      alert(err)
    })
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex h-[100vh]">
      <div className="md:w-1/2"></div>
      <div className="bg-background_color w-full md:w-1/2 flex items-center justify-center">
        <div className="w-3/4 flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-4 mb-4">
            <InputField
              placeholder={"Email"}
              name="email"
              type="email"
              register={register}
              inputRules={loginEmailRules} />
            <InputField
              placeholder={"Password"}
              name="password"
              type="password"
              register={register}
              inputRules={loginPasswordRules} />
          </div>
          <div className="flex justify-center w-1/3">
            <PrimaryButton buttonText={"Log In"} bgColorClass={'bg-primary'} />
          </div>
        </div>
      </div>
    </form>
  );
}
