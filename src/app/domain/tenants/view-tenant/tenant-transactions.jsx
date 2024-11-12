import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"


export default function TenantTransactions({ tenantTransactions, isLoading, isError }) {
  const stallUnit = (transaction) => (
    <div>
      {transaction?.stallUnit?.stallName}
    </div>
  )
  const totalPaid = (transaction) => (
    <div>
      P {transaction?.totalPaid}
    </div>
  )
  const grid = (
    <DataTable value={tenantTransactions} className="border-b py-2">
      <Column header="#" field={'id'} />
      <Column header="Month" field={'applicableMonth'} />
      <Column header="Stall Unit" body={stallUnit} />
      <Column header="Amount" body={totalPaid} />
      <Column header="Date Paid" field={'datePaid'} />
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
