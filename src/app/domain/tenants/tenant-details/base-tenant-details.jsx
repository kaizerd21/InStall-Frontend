import { Card } from '../../../shared/components/card/card';
import TenantStatus from '../../../shared/components/tenant-status/tenant-status';

export default function BaseTenantDetails({ tenantDetails }) {
  const registeredAt = new Date(tenantDetails?.createdAt)
  return (
    <div>
      <Card color='bg-white'>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mr-5 flex gap-4">
            <div>
              <img src="" alt="" className="w-[8em] h-[8em] rounded-full bg-white outline outline-green-600 outline-4" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold capitalize">{tenantDetails?.firstName} {tenantDetails?.lastName}</h1>
              <TenantStatus tenantStatus={tenantDetails?.status} />
              <div className="flex justify-between">
                <h2 className="text-green-700 font-medium">Date Joined: </h2>
                <h2>{registeredAt.toLocaleString()}</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="text-green-700 font-medium">Email Address: </h2>
                <h2>{tenantDetails?.email}</h2>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">DETAILS</h1>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Contact Number: </h2>
              <h2>{tenantDetails?.contactNumber}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Email Address: </h2>
              <h2>{tenantDetails?.email}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-green-700 font-medium">Home Address: </h2>
              <h2>{tenantDetails?.homeAddress}</h2>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}