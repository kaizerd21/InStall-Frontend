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


  // Queries
  const handleApiSuccess = (response) => {
    const data = response.data
    // navigate(`../${}`)
  }

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
            name="firstName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Middle Name"}
            name="middleName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Last Name"}
            name="lastName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Mobile Number"}
            name="mobileNumber"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Email Address"}
            name="email"
            type="email"
            register={register}
          />
          <InputFieldSecondary
            placeholder={"Default Password"}
            name="password"
            type="password"
            register={register}
          />
          <DropDown
            name="userType"
            rounded={false}
            options={userTypes}
            selected={'admin'}
            register={register}
          />
        </div>
      </Card>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <SecondaryButton buttonText={"Cancel"} handleOnClick={() => navigate('/management/accounts')} />
          <PrimaryButton buttonText={"Register"} />
        </div>
      </div>
    </form>
  )
}