import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import BaseTenantDetails from "../../tenants/tenant-details/base-tenant-details";

export default function ApproveTenant() {
  const { customAxiosInstance } = useAxiosInstance()
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenantTransactions, setTenantTransactions] = useState([])

  const fetchTenantData = async () => {
    const response = await customAxiosInstance.get(`/tenant/${id}`)
    const allTransactions = await response.data?.tenantAssignment?.stall?.invoices.filter(item => item.status === 'unpaid')
    setTenantTransactions(allTransactions)
    return response.data
  }
  const { data: tenantDetails, isLoading, isError, refetch } = useQuery({
    staleTime: 10000,
    queryKey: 'tenant-details',
    queryFn: fetchTenantData
  })

  const handleApproveTenant = async (id, status) => {
    await customAxiosInstance.patch(`/tenant/update-tenant-status/${id}`, {
      id,
      status
    }).then((res) => {
      if (res.status === 200) {
        navigate(`../`)
      }
    }).catch(err => {
      alert(err)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
      <BaseTenantDetails tenantDetails={tenantDetails} />
      <div>
        <Card color="bg-white">
          <h1 className="font-semibold">Uploaded Documents</h1>
        </Card>
      </div>
      <div className="flex justify-end">
        <div className="space-x-2">
          <button
            className="bg-green-600 hover:bg-green-700 rounded-full px-4 py-2 text-white"
            onClick={() => handleApproveTenant(tenantDetails.id, 'active')}>

            Approve</button>
          <button
            className="bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 text-white"
            onClick={() => handleApproveTenant(tenantDetails.id, 'rejected')}>

            Reject</button>
        </div>
      </div>
    </div>
  );
};
