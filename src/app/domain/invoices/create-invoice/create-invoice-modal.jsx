import { useForm } from "react-hook-form"
import { PrimaryButton } from "../../../shared/components"
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields"

export default function CreateInvoiceModal({ title, fields = [], handleCreateInvoice = () => { } }) {
  // Local Functions
  const formMethod = useForm()
  const { register, handleSubmit } = formMethod
  return (
    <form onSubmit={handleSubmit(handleCreateInvoice)} className="space-y-2">
      <h1 className="text-2xl font-semibold text-green-700 text-center">{title}</h1>
      <hr />
      <div className="flex flex-col my-2 space-y-2 w-full">
        {fields.map(field => (
          <InputFieldSecondary
            hidden={field.isHidden}
            title={field.placeholder}
            key={field.name}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            name={field.name}
            type={field.type}
            inputRules={field.inputRules}
            register={register}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <PrimaryButton buttonText={"Create"} type="submit" />
        </div>
      </div>
    </form>
  )
}
