import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import InvoiceStatus from "../../../shared/components/invoice-status/invoice-status";


export default function ViewInvoice() {
  const { customAxiosInstance } = useAxiosInstance()
  const { id } = useParams()


  const fetchInvoiceDetails = async () => {
    const response = await customAxiosInstance.get(`/invoices/${id}`)
    return response.data
  }
  const { data: invoiceDetails } = useQuery({
    staleTime: 10000,
    queryKey: "viewInvoiceDetails",
    queryFn: fetchInvoiceDetails
  })

  return (
    <div>
      <div>
        <Card>
          <div className="invoice-header flex justify-between border-b border-green-700 py-5">
            <div>
              <h1 className="font-semibold text-green-700">Holy Name University</h1>
              <h1>Janssen Heights, 6300 J.A.</h1>
              <h1>Clarin St., Tagbilaran City, Bohol</h1>
            </div>
            <div>
              <h1 className="font-bold text-green-700 text-2xl text-right">Invoice #{invoiceDetails?.id}</h1>
              <div className="grid grid-cols-2 gap-2">
                <h1 className="text-green-700 text-right">Invoice Date:</h1>
                <h1 className="text-right">{"January 10, 2024"}</h1>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <h1 className="text-green-700 text-right">Due Date:</h1>
                <h1 className="text-right">{"February 10, 2024"}</h1>
              </div>
            </div>
          </div>
          <div className="invoice-header flex justify-between border-b border-green-700 py-5">
            <div>
              <h1 className="text-green-700">Invoice to:</h1>
              <h1 className="text-lg font-semibold capitalize">{invoiceDetails?.stallUnit?.assignment?.[0]?.tenant?.firstName} {invoiceDetails?.stallUnit?.assignment?.[0]?.tenant?.lastName}</h1>
              <h1>{invoiceDetails?.stallUnit?.assignment?.[0]?.tenant?.phoneNumber}</h1>
              <h1>{invoiceDetails?.stallUnit?.assignment?.[0]?.tenant?.email}</h1>
              <h1>{invoiceDetails?.stallUnit?.assignment?.[0]?.tenant?.homeAddress}</h1>
            </div>
            <div>
              <h1 className="font-bold text-green-700 text-right">Billing Details:</h1>
              <div className="grid grid-cols-2 gap-2">
                <h1 className="text-green-700 text-right">Total Due:</h1>
                <h1 className="text-right">{invoiceDetails?.totalDue}</h1>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <h1 className="text-green-700 text-right">Stall Unit</h1>
                <h1 className="text-right">{invoiceDetails?.stallUnit?.stallName}</h1>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <h1 className="text-green-700 text-right">Status:</h1>
                <InvoiceStatus invoiceStatus={invoiceDetails?.status} />
              </div>
            </div>
          </div>
          <div className="invoice-header flex justify-between border-b border-green-700 py-5">
            <div>
              <h1>Rent</h1>
            </div>
            <div>
              <h1 className="text-green-700 text-right">P {invoiceDetails?.rentalAmount}</h1>
            </div>
          </div>
          <div className="invoice-header flex flex-col border-b border-green-700 py-5">
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold">Utilities and Miscellaneous</h1>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h1>Electricity</h1>
              </div>
              <div>
                <h1 className="text-green-700 text-right">P {invoiceDetails?.stallElectricity?.amountIncurred || 0}</h1>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h1>Water</h1>
              </div>
              <div>
                <h1 className="text-green-700 text-right">P {invoiceDetails?.water?.amount || 0}</h1>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h1>Miscellaneous</h1>
              </div>
              <div>
                <h1 className="text-green-700 text-right">P {invoiceDetails?.misc?.amount || 0}</h1>
              </div>
            </div>
          </div>
          <div className="invoice-header flex flex-col border-b border-green-700 py-5">
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold">Balance</h1>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h1>Previous Month's Balance</h1>
              </div>
              <div>
                <h1 className="text-green-700 text-right">P {invoiceDetails?.balance || 0}</h1>
              </div>
            </div>
          </div>
          <div className="invoice-header flex flex-col border-b border-green-700 py-5">
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold">Total Payment</h1>
              </div>
              <div>
                <h1 className="text-green-700 text-right">P {invoiceDetails?.totalDue || 0}</h1>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}
