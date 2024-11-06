import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { PrimaryButton, SecondaryButton } from "../../../shared/components/buttons/buttons";
import { Card } from "../../../shared/components/card/card";


export default function InvoiceReceipt() {
  const { id } = useParams()
  const { customAxiosInstance } = useAxiosInstance()

  const fetchInvoiceDetails = async () => {
    const response = await customAxiosInstance.get(`/invoices/${id}`)
    return response.data
  }
  const { data: invoiceDetails, isLoading, isError } = useQuery({
    staleTime: 1000,
    queryKey: "invoices",
    queryFn: fetchInvoiceDetails,
  })
  return (
    <div className="mt-10">
      <Card color="bg-white">
        <div className="flex space-x-5 items-center w-full border-b-[1px] border-green-600 pb-5">
          <div>
            <img src="" alt="" className="rounded-full h-[6em] w-[6em] bg-green-700" />
          </div>
          <div className="flex-1">
            <h1 className="text-green-700 text-xl font-bold">Holy Name University</h1>
            <h2>Janssen Heights, 6300 J.A.</h2>
            <h2>Clarin St., Tagbilaran City, Bohol</h2>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold">Receipt</h1>
            <h1 className="text-green-700 text-xl font-bold flex-1">INVOICE # {invoiceDetails?.id}</h1>
          </div>
        </div>
        <div className="flex space-x-5 items-center w-full border-b-[1px] border-green-600 py-5">
          <div className="flex-1">
            <h1 className="text-xl font-bold uppercase">{invoiceDetails?.stallUnit?.assignment?.[0].tenant?.firstName} {invoiceDetails?.stallUnit?.assignment?.[0].tenant?.lastName}</h1>
            <h2>{invoiceDetails?.stallUnit?.assignment?.[0].tenant?.phoneNumber || 'Contact Number'}</h2>
            <h2>{invoiceDetails?.stallUnit?.assignment?.[0].tenant?.email}</h2>
            <h2>{invoiceDetails?.stallUnit?.assignment?.[0].tenant?.homeAddress || 'Home Address'}</h2>
          </div>
          <div className="w-[15em]">
            <h1 className="text-xl font-bold text-green-700">Billing Details:</h1>
            <div className="flex justify-between">
              <h2 className="text-green-700">Total Due:</h2>
              <h2>P5,000.00</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700">Stall Unit:</h2>
              <h2>{invoiceDetails?.stallUnit?.stallName}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700">Payment Method:</h2>
              <h2>{invoiceDetails?.paymentMethod}</h2>
            </div>
          </div>
        </div>
        <div className="flex space-x-5 items-center w-full border-b-[1px] border-green-600 py-5">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Remaining Balance</h1>
          </div>
          <div>
            <h1 className="text-xl text-green-700">P1,234.00</h1>
          </div>
        </div>
        <div className="flex space-x-5 items-center w-full py-5">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Total Payment</h1>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-green-700">P1,234.00</h1>
          </div>
        </div>
      </Card>
      <div className="flex justify-end my-4">
        <div className="flex space-x-4">
          <SecondaryButton buttonText={"Print"} />
          <PrimaryButton buttonText={"Done"} />
        </div>
      </div>
    </div>
  )
}
