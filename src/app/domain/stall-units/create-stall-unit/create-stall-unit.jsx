import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { PrimaryButton, SecondaryButton } from "../../../shared/components/buttons/buttons";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields";
import { useStallUnits } from "../stall-unit-context/stall-units-context.hook";


export function CreateStallUnit() {
  // Local Declarations
  const navigate = useNavigate()
  const { customAxiosInstance } = useAxiosInstance()
  const { locations } = useStallUnits()


  // Queries

  // Local Functions
  const formMethod = useForm()
  const { register, handleSubmit } = formMethod
  const handleCreateStallUnit = async (data) => {
    await customAxiosInstance.post(`/stall-units/create-stall-unit`, data).then(res => {
      if (res.status === 201) {
        navigate(`/management/stall-units`)
      }
    }).catch(err => alert(err))
  }


  return (
    <form onSubmit={handleSubmit(handleCreateStallUnit)} className="py-5 space-y-5">
      <Card>
        <h1 className="text-2xl font-semibold text-green-700">Create Stall Unit</h1>
        <div className="flex flex-col w-1/2 my-5 space-y-2">
          <InputFieldSecondary
            title={"Property Name"}
            customInputClasses={'w-2/3'}
            placeholder={"Property Name"}
            name="stallName"
            type="text"
            register={register}
          />
          <InputFieldSecondary
            title={"Monthly Rent"}
            customInputClasses={'w-2/3'}
            placeholder={"Monthly Rent"}
            name="rentalFee"
            type="string"
            register={register}
          />
          <DropDown
            title={"Location"}
            customInputClasses={'w-2/3'}
            name="location"
            rounded={false}
            options={locations}
            register={register}
          />
          <InputFieldSecondary
            title={"Description"}
            customInputClasses={'w-2/3'}
            placeholder={"Description"}
            name="description"
            type="text"
            register={register}
          />
          <div>IMAGE TO DO</div>
        </div>
      </Card>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <a
            href='/management/accounts'
            className="bg-secondary px-4 py-2 text-white rounded-full shadow-md">Cancel</a>
          <PrimaryButton buttonText={"Create"} type="submit" />
        </div>
      </div>
    </form>
  )
}



