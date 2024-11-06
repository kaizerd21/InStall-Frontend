import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { PrimaryButton } from "../../../shared/components/buttons/buttons";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields";
import TenantDetails from "../../tenants/tenant-details/tenant-details";


export default function PayInvoice({ payInvoice = false }) {
  const { id } = useParams()
  const { customAxiosInstance } = useAxiosInstance()
  const navigate = useNavigate()

  const fetchInvoiceDetails = async () => {
    const response = await customAxiosInstance.get(`/invoices/${id}`)
    return response.data
  }

  const { data: invoiceDetails, isLoading, isError } = useQuery({
    staleTime: 1000,
    queryKey: "invoices",
    queryFn: fetchInvoiceDetails,
  })

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      ...invoiceDetails,
      id: parseInt(id),
      totalPaid: null,
      paymentMethod: 'Cash',
      misc: {},
      stallElectricity: {},
      water: {},
      rentPayment: {}
    }
  })

  useEffect(() => {
    setValue('misc', invoiceDetails?.misc)
    setValue('stallElectricity', invoiceDetails?.stallElectricity)
    setValue('water', invoiceDetails?.water)
    setValue('rentPayment', invoiceDetails?.rentPayment)
  }, [invoiceDetails])

  const handlePayInvoice = async (data) => {
    console.log(data)
    await customAxiosInstance.patch(`/invoices/pay-invoice/${id}`, data).then((res) => {
      if (res.status === 200) {
        alert(res.data.message)
        navigate(`../../view-receipt/${id}`)
      }
    }).catch((err) => console.log(err))
  }

  const paymentMethods = [
    { value: "Cash", title: "Cash" },
    { value: "GCash", title: "GCash" },
    { value: "Bank Transfer", title: "Bank Transfer" },
  ]

  return (
    <div>
      <div className="mb-4">
        Pay Due Invoices / Pay Invoice
      </div>
      <div className="space-y-8">
        <TenantDetails invoiceDetails={invoiceDetails} tenantDetails={invoiceDetails?.stallUnit?.assignment[0]?.tenant} />
        <div className={`grid grid-cols-1 ${payInvoice ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`}>
          <div>
            <Card>
              <h1 className="text-3xl text-green-700 font-semibold mb-4">Payable Bills</h1>
              <div className="flex justify-between">
                <h2 className="font-semibold">Rent</h2>
                <h2 className="text-green-700">P {invoiceDetails?.rentalAmount?.toFixed(2) || "0.00"}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="font-semibold">Electricity</h2>
                <h2 className="text-green-700">P {invoiceDetails?.stallElectricity?.amountIncurred?.toFixed(2) || "0.00"}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="font-semibold">Water</h2>
                <h2 className="text-green-700">P {invoiceDetails?.water?.amount?.toFixed(2) || "0.00"}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="font-semibold">Previous Month's Balance (TODO)</h2>
                <h2 className="text-green-700">P {invoiceDetails?.water?.amountIncurred?.toFixed(2) || "0.00"}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="font-semibold">Total Payment</h2>
                <h2 className="text-green-700">P {invoiceDetails?.totalDue?.toFixed(2) || "0.00"}</h2>
              </div>
            </Card>
          </div>
          {payInvoice && (
            <form onSubmit={handleSubmit(handlePayInvoice)}>
              <Card>
                <h1 className="text-3xl text-green-700 font-semibold mb-4">Pay Here!</h1>
                <div className="flex flex-col gap-4">
                  <InputFieldSecondary
                    title={"Amount Paid (Php)"}
                    customInputClasses={"w-2/3"}
                    name="totalPaid"
                    type="number"
                    register={register}
                    inputRules={{ required: true, valueAsNumber: true }}
                  />
                  <DropDown
                    title={"Payment Method"}
                    customInputClasses={"w-2/3"}
                    name="paymentMethod"
                    rounded={false}
                    options={paymentMethods}
                    selected={'cash'}
                    register={register}
                    inputRules={{ required: true }}
                  />
                </div>
              </Card>
              <div className="my-4 flex justify-end">
                <PrimaryButton classNames="w-[30%]" buttonText={"Pay Now"} disabled={false} />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
