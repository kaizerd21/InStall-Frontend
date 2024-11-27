import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useQuery } from "react-query"
import { useAxiosInstance } from "../../../core/main-api"
import { Card } from "../../../shared/components/card/card"

export default function Ledger() {
  const { customAxiosInstance } = useAxiosInstance()
  const [searchTerm, setSearchTerm] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  const fetchLedger = async () => {
    let response;
    if (user.userType === 'tenant') {
      response = await customAxiosInstance.get(`/invoices/tenant-ledger/${user.id}${searchTerm !== '' ? `?searchTerm=${searchTerm}` : ''}`)
    }
    else {
      response = await customAxiosInstance.get(`/invoices/ledger${searchTerm !== '' ? `?searchTerm=${searchTerm}` : ''}`)
    }
    return response.data
  }
  const { data: paidInvoices, isLoading, isError, refetch } = useQuery({
    staleTime: 10000,
    queryKey: "paidInvoices",
    queryFn: fetchLedger
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch()
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchTerm])

  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const datePaid = (invoice) => {
    const date = new Date(invoice.datePaid);
    return (
      <div>
        {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
      </div>
    )
  }
  const transactionTime = (invoice) => {
    const date = new Date(invoice.datePaid);
    return (
      <div>
        {date.getHours()}:{date.getMinutes()} {date.getHours() > 12 ? "PM" : "AM"}
      </div>
    )
  }
  const tenantId = (invoice) => (
    <div>
      {invoice?.stallUnit?.assignment?.[0]?.tenant.id}
    </div>
  )
  const debit = (invoice) => (
    <div>
      P {(invoice?.totalDue - invoice?.totalPaid) === 0 ? "-" : invoice?.totalDue}
    </div>
  )
  const credit = (invoice) => (
    <div>
      P {invoice?.totalPaid}
    </div>
  )
  const balance = (invoice) => (
    <div>
      P{invoice?.balance}
    </div>
  )
  const grid = (
    <DataTable value={paidInvoices}>
      <Column header="Transaction Date" body={datePaid} />
      <Column header="Transaction Time" body={transactionTime} />
      <Column header="Description" field="" />
      <Column header="Teller ID No." field="createdBy" />
      <Column header="Tenant ID No." body={tenantId} />
      <Column header="Ref. No." field="id" />
      <Column header="Debit" body={debit} />
      <Column header="Credit" body={credit} />
      <Column header="Balance" field={balance} />
    </DataTable>
  )

  return (
    <div>
      <h1>Ledger</h1>
      <div className="flex justify-end mb-2">
        <div className="flex items-center border-[1px] border-green-700 bg-white" >
          <FiSearch className="text-2xl text-green-700 m-2" />
          <input onChange={(e) => { setSearchTerm(e.target.value) }} type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
        </div>
      </div>
      <Card>
        <div>
          {grid}
          {isError && !isLoading && showError}
          {isLoading && showLoading}
        </div>
      </Card>
    </div>
  )
}
