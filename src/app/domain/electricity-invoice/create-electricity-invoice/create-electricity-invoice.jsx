import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAxiosInstance } from "../../../core/main-api"
import { PrimaryButton } from "../../../shared/components"
import { Card } from "../../../shared/components/card/card"
import { DropDown } from "../../../shared/components/drop-down/drop-down"
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields"

export default function CreateElectricityInvoice() {
  // Local Declarations
  const navigate = useNavigate()
  const { customAxiosInstance } = useAxiosInstance()

  // Local Functions
  const formMethod = useForm()
  const { register, handleSubmit } = formMethod
  const handleCreateElectricityInvoice = async (data) => {
    data["kwhrUsage"] = data.presReading - data.prevReading;
    await customAxiosInstance.post(`/main-electricity`, data).then(res => {
      if (res.status === 201) {
        navigate(`/management/all-invoices/main-electricity`)
      }
    }).catch(err => alert(err))
  }
  return (
    <form onSubmit={handleSubmit(handleCreateElectricityInvoice)} className="py-5 space-y-5">
      <Card>
        <h1 className="text-2xl font-semibold text-green-700">Add Electricity Bill</h1>
        <div className="flex flex-col w-1/2 my-5 space-y-2">
          <InputFieldSecondary
            title={"Reading Date"}
            customInputClasses="w-1/2"
            placeholder={"Reading Date"}
            name="readingDate"
            type="date"
            register={register}
          />
          <InputFieldSecondary
            title={"Previous Reading"}
            customInputClasses="w-1/2"
            placeholder={"Previous Reading"}
            name="prevReading"
            type="number"
            register={register}
            inputRules={{ valueAsNumber: true }}
          />
          <InputFieldSecondary
            title={"Present Reading"}
            customInputClasses="w-1/2"
            placeholder={"Present Reading"}
            name="presReading"
            type="number"
            register={register}
            inputRules={{ valueAsNumber: true }}
          />
          <InputFieldSecondary
            title={"Kilowatt Rate"}
            customInputClasses="w-1/2"
            placeholder={"Kilowatt Rate"}
            name="kwhrRate"
            type="number"
            register={register}
            inputRules={{ valueAsNumber: true }}
          />
          <InputFieldSecondary
            title={"Total Amount Bill"}
            customInputClasses="w-1/2"
            placeholder={"Total Amount Bill"}
            name="totalAmountBill"
            type="number"
            register={register}
            inputRules={{ valueAsNumber: true }}
          />
        </div>
      </Card>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <a
            href='/management/all-invoices/main-electricity'
            className="bg-secondary px-4 py-2 text-white rounded-full shadow-md">Cancel</a>
          <PrimaryButton buttonText={"Create"} type="submit" />
        </div>
      </div>
    </form>
  )
}
