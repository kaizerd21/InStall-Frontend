import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { months, years } from "../../../core/global-options";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import InvoiceStatus from "../../../shared/components/invoice-status/invoice-status";



export default function UnpaidInvoices() {
  const { customAxiosInstance } = useAxiosInstance()
  const navigate = useNavigate()
  const currentDate = new Date();
  const [filters, setFilters] = useState({
    applicableMonth: months[currentDate.getMonth()].value,
    year: currentDate.getFullYear()
  })
  const [searchTerm, setSearchTerm] = useState("")

  const [total, setTotal] = useState({
    totalAmountDue: 0,
  })

  const fetchDueInvoices = async () => {
    if (!filters.applicableMonth && !filters.year) return
    const res = await customAxiosInstance
      .get(`/invoices?month=${filters.applicableMonth}&year=${filters.year}${searchTerm ? `&searchTerm=${searchTerm}` : ''}&status=unpaid`)
      .catch(err => { console.log(err) })

    return res.data
  }
  const { data: invoices, isError, isLoading } = useQuery({
    queryKey: "dueInvoices",
    queryFn: fetchDueInvoices,
  })
  const handleInputChange = () => { }
  const handleSearchInput = () => { }
  const exportToExcel = () => { }

  const searchField = (
    <div className="flex items-center border-[1px] border-green-700 bg-white" >
      <FiSearch className="text-2xl text-green-700 m-2" />
      <input onChange={handleSearchInput} type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
    </div>
  )
  const tenant = (invoice) => (
    <div>
      <h2 className="capitalize">
        {invoice.stallUnit?.assignment[0]?.tenant?.firstName} {invoice.stallUnit?.assignment[0]?.tenant?.lastName}
      </h2>
    </div>
  )
  const stallName = (invoice) => (
    <div>
      {invoice?.stallUnit?.stallName}
    </div>
  )
  const location = (invoice) => (
    <div>
      {invoice?.stallUnit?.location}
    </div>
  )
  const amount_due = (invoice) => (
    <div>
      P {invoice?.totalDue || 0}
    </div>
  )
  const status = (invoice) => (
    <div>
      <InvoiceStatus invoiceStatus={invoice?.status} />
    </div>
  )
  const action = (invoice) => (
    <div>
      <button onClick={() => {
        navigate(`../../all-invoices/view-invoice/${invoice.id}`)
      }}
        className="bg-green-600 text-green-900 font-semibold hover:bg-green-700 hover:text-white px-2 rounded-md"
      >
        Details
      </button>
    </div>
  )
  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const grid = (
    <DataTable value={invoices}>
      <Column header="ID Number" field="id" />
      <Column header="Tenant" body={tenant} />
      <Column header="Stall Name" body={stallName} />
      <Column header="Location" body={location} />
      <Column header="Amount Due" body={amount_due} />
      <Column header="Status" body={status} />
      <Column header="Action" body={action} />
    </DataTable>
  )

  return (
    <div>
      <h1 className="text-lg font-bold">Unpaid Invoices</h1>
      <Card>
        <div className="flex justify-between gap-2 mb-5">
          <div className={`flex flex-col w-full`}>
            <label className="text-left">Select Month</label>
            <select
              name="applicableMonth"
              value={filters.applicableMonth}
              onChange={handleInputChange}
              className="w-full bg-inputfield_color px-4 py-2 focus:outline-none border-[1px] border-green-700">
              <option value={""} disabled selected>Select Month</option>
              {months?.map(option => (
                <option value={option.value} key={option.id}>{option.title}</option>
              ))}
            </select>
          </div>
          <div className={`flex flex-col w-full`}>
            <label className="text-left">Select Year</label>
            <select
              name="year"
              value={filters.year}
              onChange={handleInputChange}
              className="w-full bg-inputfield_color px-4 py-2 focus:outline-none border-[1px] border-green-700">
              <option value={""} disabled selected>Select Year</option>
              {years?.map(option => (
                <option value={option.value} key={option.value}>{option.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between gap-4 border-b pb-8 border-green-700 mb-4">
          <div className="flex-1">
            <Card color="bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl text-green-700 font-bold">Total Amount Due</h2>
                  <h1 className="text-4xl font-bold">P {total.totalAmountDue.toFixed(2)}</h1>
                </div>
                <div>
                  <div>Peso Sign</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={exportToExcel} className="bg-green-700 rounded-md px-6 py-2 text-white font-semibold">
            Print
          </button>
          {searchField}
        </div>
        <div className="my-5">
          {grid}
          {isError && !isLoading && showError}
          {isLoading && showLoading}
        </div>
      </Card>
    </div>
  )
}
