import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api"
import { Card } from "../../../shared/components/card/card";


export default function ListInvoiceMonths({ status }) {
  const { customAxiosInstance } = useAxiosInstance()
  const navigate = useNavigate()

  const fetchInvoices = async () => {
    const res = await customAxiosInstance.get(`/invoices/months`);
    return res.data;

  }
  const { data: invoice_months, error, isLoading } = useQuery({
    staleTime: 10000,
    queryKey: "invoice_months",
    queryFn: fetchInvoices,
  })
  const searchField = (
    <div className="flex items-center border-[1px] border-green-700 bg-white" >
      <FiSearch className="text-2xl text-green-700 m-2" />
      <input type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
    </div>
  )
  const action = (invoice) => (
    <div className="flex space-x-2">
      <button onClick={() => navigate(`/management/all-invoices/${status === 'archived' ? 'archived-invoices' : 'view-invoices'}/${invoice.applicableMonth}/${invoice.year}`)}>
        View Invoices
      </button>
    </div>
  )
  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const grid = (
    <DataTable value={invoice_months}>
      <Column header="Listing #" field="id" />
      <Column header="Month" field="applicableMonth" />
      <Column header="Year" field="year" />
      <Column header="Action" body={action} />
    </DataTable>
  )
  return (
    <div>
      <div>
        <h1 className="capitalize">{status ? "Archived Invoices" : "Show Invoices"}</h1>
      </div>
      <div className="flex justify-end mb-2">
        {searchField}
      </div>
      <Card>
        <div>
          {grid}
          {error && !isLoading && showError}
          {isLoading && showLoading}
        </div>
      </Card>
    </div>
  )
}
