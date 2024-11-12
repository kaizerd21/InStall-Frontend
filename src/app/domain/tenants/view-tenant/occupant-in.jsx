import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"


export default function OccupantIn({ stallUnit, isLoading, isError }) {
  const grid = (
    <DataTable value={[stallUnit]} className="border-b py-2">
      <Column header="Stall #" field={'id'} />
      <Column header="Stall Name" field={'stallName'} />
      <Column header="Location" field={'location'} />
      <Column header="Monthly Rent" field={'rentalFee'} />
      <Column header="Date Rented" field={'createdAt'} />
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
