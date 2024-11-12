import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import BaseTenantDetails from "../tenant-details/base-tenant-details";
import OccupantIn from "./occupant-in";
import TenantInvoices from "./tenant-invoices";
import TenantTransactions from "./tenant-transactions";

export default function ViewTenant() {
  const { customAxiosInstance } = useAxiosInstance()
  const { id } = useParams()
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card color="bg-white">
          <h1 className="font-semibold">Tenant Transactions</h1>
          <TenantTransactions tenantTransactions={tenantTransactions} isLoading={isLoading} isError={isError} />
        </Card>
        <Card color="bg-white">
          <h1 className="font-semibold">Tenant Invoices</h1>
          <TenantInvoices tenantInvoices={tenantDetails?.tenantAssignment?.stall?.invoices} isLoading={isLoading} isError={isError} />
        </Card>
      </div>
      <div>
        <Card color="bg-white">
          <h1 className="font-semibold">Occupant In</h1>
          <OccupantIn stallUnit={tenantDetails?.tenantAssignment?.stall} isLoading={isLoading} isError={isError} />
        </Card>
      </div>
    </div>
  );
};
