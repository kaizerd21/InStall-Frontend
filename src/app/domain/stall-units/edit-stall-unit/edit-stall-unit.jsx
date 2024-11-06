import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useAxiosInstance } from "../../../core/main-api"
import { PrimaryButton, SecondaryButton } from "../../../shared/components/buttons/buttons"
import { Card } from "../../../shared/components/card/card"
import { DropDown } from "../../../shared/components/drop-down/drop-down"
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields"
import { useStallUnits } from "../stall-unit-context/stall-units-context.hook"


export function EditStallUnit() {
  const { stallID } = useParams()
  const { customAxiosInstance } = useAxiosInstance()
  const { locations } = useStallUnits()
  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await customAxiosInstance.get(`/stall-units/${stallID}`)
    return response.data
  }

  const { data: stallUnit, isLoading: stallisLoading, isError: stallIsError } = useQuery({
    queryKey: 'stallUnit',
    queryFn: fetchData,
    onSuccess: (data) => {
      setValue('stallName', data.stallName)
      setValue('rentalFee', data.rentalFee.toString())
      setValue('location', data.location)
      setValue('description', data.description)
    }
  })

  const { data: formData, setValue, register, handleSubmit } = useForm({
    defaultValues: stallUnit
  })

  const handleEditStall = async (payload) => {
    const response = await customAxiosInstance.patch(`/stall-units/${stallID}`, payload)
    return response.data;
  }

  const { mutate: updateStall, isLoading, isError } = useMutation({
    mutationFn: handleEditStall,
    onSuccess: (response) => {
      navigate(`../`)
    }
  })


  return (
    <form onSubmit={handleSubmit(updateStall)} className="py-5 space-y-5">
      <Card>
        <h1 className="text-2xl font-semibold text-green-700">Edit Stall Unit</h1>
        <div className="flex flex-col w-1/2 my-5 space-y-2">
          <InputFieldSecondary
            title={"Property Name"}
            customInputClasses={'w-2/3'}
            placeholder={"Property Name"}
            name="stallName"
            type="text"
            register={register}
            defaultValue={formData?.stallName}
          />
          <InputFieldSecondary
            title={"Monthly Rent"}
            customInputClasses={'w-2/3'}
            placeholder={"Monthly Rent"}
            name="rentalFee"
            type="string"
            register={register}
            defaultValue={formData?.rentalFee.toString()}
          />
          <DropDown
            title={"Location"}
            customInputClasses={'w-2/3'}
            name="location"
            rounded={false}
            options={locations}
            selected={formData?.location}
            register={register}
          />
          <InputFieldSecondary
            title={"Description"}
            customInputClasses={'w-2/3'}
            placeholder={"Description"}
            name="description"
            type="text"
            register={register}
            defaultValue={formData?.description}
          />
          <div>IMAGE TO DO</div>
        </div>
      </Card>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <SecondaryButton buttonText={"Cancel"} handleOnClick={() => navigate('/management/stall-units')} />
          <PrimaryButton buttonText={"Update"} />
        </div>
      </div>
    </form>
  )
}
