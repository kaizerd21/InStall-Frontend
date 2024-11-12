import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { RxArchive } from "react-icons/rx";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";


export default function ListInvoices({ status, optionalFilter = null }) {
  const { customAxiosInstance } = useAxiosInstance()
  const navigate = useNavigate()
  const { month, year } = useParams()

  const fetchInvoices = async () => {
    const res = await customAxiosInstance
      .get(`/invoices?month=${optionalFilter ?
        optionalFilter.applicableMonth :
        month}&year=${optionalFilter ?
          optionalFilter.year :
          year}${status === 'archived' ? '&status=archived' : ''}`);
    return res.data;

  }
  const { data: invoices, error, isLoading, refetch } = useQuery({
    staleTime: 1000,
    queryKey: "invoices",
    queryFn: fetchInvoices,
  })


  useEffect(() => {
    if (optionalFilter && (!optionalFilter?.applicableMonth || !optionalFilter?.year)) {
      return
    }
    refetch()
  }, [optionalFilter])

  const searchField = (
    <div className="flex items-center border-[1px] border-green-700 bg-white" >
      <FiSearch className="text-2xl text-green-700 m-2" />
      <input type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
    </div>
  )
  const action = (invoice) => (
    <div className="flex space-x-2">
      <button onClick={() => {
        if (invoice.status === 'paid') {
          navigate(`../view-receipt/${invoice.id}`)
        }
        else {
          navigate(`${optionalFilter ? '' : '../'}view-invoice/${invoice.id}`)
        }
      }}>
        <IoEyeSharp className="text-green-700 text-xl" />
      </button>
      <button>
        <RxArchive className="text-green-700 text-xl" />
      </button>
    </div>
  )
  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const stallUnit = (invoice) => (
    <div>
      <h2 className="capitalize">
        {invoice.stallUnit.stallName}
      </h2>
    </div>
  )
  const tenant = (invoice) => (
    <div>
      <h2 className="capitalize">
        {invoice.stallUnit?.assignment[0]?.tenant?.firstName} {invoice.stallUnit?.assignment[0]?.tenant?.lastName}
      </h2>
    </div>
  )
  const rent = (invoice) => (
    <div>
      P {invoice?.rentPayment?.amountPaid || 0}
    </div>
  )
  const util_and_misc = (invoice) => (
    <div>
      P {(invoice.misc?.amount || 0) + (invoice.stallElectricity?.amountIncurred || 0) + (invoice.water?.amount || 0)}
    </div>
  )
  const total_payable = (invoice) => (
    <div>
      P {invoice?.totalDue || 0}
    </div>
  )
  const balance = (invoice) => (
    <div>
      P {invoice?.balance || 0}
    </div>
  )
  const grid = (
    <DataTable value={invoices}>
      <Column header="#" field="id" />
      <Column header="Stall Unit" body={stallUnit} />
      <Column header="Tenant" body={tenant} />
      <Column header="Rent" body={rent} />
      <Column header="Utilities & Misc." body={util_and_misc} />
      <Column header="Total Payable" body={total_payable} />
      <Column header="Balance" body={balance} />
      <Column header="Status" field="status" />
      <Column header="Action" body={action} />
    </DataTable>
  )
  return (
    <div>
      {optionalFilter ? null : (
        <div>
          {status === "archived" ? "Archived " : null}Invoices / {month} {year}
        </div>
      )}
      <div className="flex justify-end mb-2 space-x-2">
        {searchField}
        <button className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-700"
          onClick={() => refetch()}>
          Reload
        </button>
      </div>
      <div className="flex justify-end mb-2 space-x-2">
        <p className="text-sm text-gray-500">In case of error: Click Reload</p>
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
