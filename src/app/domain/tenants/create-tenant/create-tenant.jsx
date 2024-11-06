import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { PrimaryButton, SecondaryButton } from "../../../shared/components/buttons/buttons";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields";


export function CreateTenant() {
  // Local Declarations
  const navigate = useNavigate()
  const { customAxiosInstance } = useAxiosInstance()


  // Queries
  // const handleApiSuccess = (response) => {
  //   const data = response.data
  //   // navigate(`../${}`)
  // }

  // Local Functions
  const formMethod = useForm()
  const { register, handleSubmit } = formMethod

  const handleAddTenant = async (data) => {
    const response = await customAxiosInstance.post(`/tenant/create-tenant`, data)
    if (response.status === 201) {
      navigate(`/management/tenants`)
    }
  }


  return (
    <div>
      <h1 className="text-3xl font-bold">Tenants</h1>
      <form onSubmit={handleSubmit(handleAddTenant)} className="py-5 space-y-5">
        <Card>
          <h1 className="text-2xl font-semibold text-green-700">New Tenant</h1>
          <div className="flex flex-col w-1/2 my-5 space-y-2">
            <InputFieldSecondary
              title={"First Name"}
              customInputClasses={"w-2/3"}
              placeholder={"First Name"}
              name="firstName"
              type="text"
              register={register}
            />
            <InputFieldSecondary
              title={"Middle Name"}
              customInputClasses={"w-2/3"}
              placeholder={"Middle Name"}
              name="middleName"
              type="text"
              register={register}
            />
            <InputFieldSecondary
              title={"Last Name"}
              customInputClasses={"w-2/3"}
              placeholder={"Last Name"}
              name="lastName"
              type="text"
              register={register}
            />
            <InputFieldSecondary
              title={"Mobile Number"}
              customInputClasses={"w-2/3"}
              placeholder={"Mobile Number"}
              name="mobileNumber"
              type="text"
              register={register}
            />
            <InputFieldSecondary
              title={"Email Address"}
              customInputClasses={"w-2/3"}
              placeholder={"Email Address"}
              name="email"
              type="email"
              register={register}
            />
            <InputFieldSecondary
              title={"Default Password"}
              customInputClasses={"w-2/3"}
              placeholder={"Default Password"}
              name="password"
              type="password"
              register={register}
            />
            <DropDown
              title={"User Type"}
              customInputClasses={"w-2/3"}
              name="userType"
              rounded={false}
              options={[{ value: "tenant", title: "Tenant" }]}
              selected={'tenant'}
              register={register}
              disabled={true}
            />
          </div>
        </Card>
        <div className="flex justify-end">
          <div className="flex space-x-2">
            <a
              href='/management/tenants'
              className="bg-secondary px-4 py-2 text-white rounded-full shadow-md">Cancel</a>
            <PrimaryButton buttonText={"Register"} />
          </div>
        </div>
      </form>
    </div>
  )
}
