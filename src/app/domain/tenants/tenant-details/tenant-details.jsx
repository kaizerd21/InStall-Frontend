import { Card } from '../../../shared/components/card/card';

export default function TenantDetails({ tenantDetails, invoiceDetails }) {
  return (
    <div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mr-5 flex gap-4">
            <div>
              <img src="" alt="" className="w-[8em] h-[8em] rounded-full bg-white outline outline-green-600 outline-4" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold capitalize">{tenantDetails?.firstName} {tenantDetails?.lastName}</h1>
              <div className="bg-green-600 rounded-xl w-min px-2 py-1 text-white capitalize">
                {tenantDetails?.status}
              </div>
              <div className="flex justify-between">
                <h2 className="text-green-700 font-medium">Tenant ID: </h2>
                <h2>{tenantDetails?.id}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="text-green-700 font-medium">Contact Number: </h2>
                <h2>{tenantDetails?.contactNumber}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="text-green-700 font-medium">Email Address: </h2>
                <h2>{tenantDetails?.email}</h2>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">DETAILS</h1>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Invoice Number: </h2>
              <h2>{invoiceDetails?.id}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Stall Name: </h2>
              <h2 className="capitalize">{invoiceDetails?.stallUnit?.stallName}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Applicable Month: </h2>
              <h2>{invoiceDetails?.applicableMonth}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Due Date: </h2>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
