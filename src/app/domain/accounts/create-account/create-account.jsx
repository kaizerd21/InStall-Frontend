import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../../shared/components/buttons/buttons";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields";
import { userTypes } from "../accounts";
import { useAccountsContext } from "../accounts-context/accounts.context";


export function CreateAccount() {
  // Local Declarations
  const navigate = useNavigate()
  const { handleCreateAccount } = useAccountsContext()

  // Local Functions
  const formMethod = useForm()
  const { register, handleSubmit } = formMethod


  return (
    <form onSubmit={handleSubmit(handleCreateAccount)} className="py-5 space-y-5">
      <Card>
        <h1 className="text-2xl font-semibold text-green-700">New Employee</h1>
        <div className="flex flex-col w-1/2 my-5 space-y-2">
          <InputFieldSecondary
            placeholder={"First Name"}
            title={"First Name"}
            name="firstName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Middle Name"}
            title={"Middle Name"}
            name="middleName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Last Name"}
            title={"Last Name"}
            name="lastName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Mobile Number"}
            title={"Mobile Number"}
            name="mobileNumber"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Email Address"}
            title={"Email Address"}
            name="email"
            type="email"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Default Password"}
            title={"Default Password"}
            name="password"
            type="password"
            register={register}
          />
          <DropDown
            name="userType"
            title="User Type"
            rounded={false}
            options={userTypes}
            selected={'admin'}
            register={register}
          />
        </div>
      </Card>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <a
            href='/management/accounts'
            className="bg-secondary px-4 py-2 text-white rounded-full shadow-md">Cancel</a>
          <PrimaryButton buttonText={"Register"} />
        </div>
      </div>
    </form>
  )
}
