import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"


export default function TenantInvoices({ tenantInvoices, isLoading, isError }) {
  const action = () => (
    <div>
      Action
    </div>
  )
  const grid = (
    <DataTable value={tenantInvoices} className="border-b py-2">
      <Column header="#" field={'id'} />
      <Column header="Month" field={'applicableMonth'} />
      <Column header="Status" field={'status'} />
      <Column header="Action" body={action} />
    </DataTable>
  )

  const showError = () => (
    <div>
      Error
    </div>
  )
  const showLoading = () => (
    <div>
      Show Loading
    </div>
  )
  return (
    <div>
      {grid}
      {isError && !isLoading && showError}
      {isLoading && showLoading}
    </div>
  )
}
