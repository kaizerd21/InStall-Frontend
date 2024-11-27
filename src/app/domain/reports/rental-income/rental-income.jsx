import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { months, years } from "../../../core/global-options";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";

export default function RentalIncome() {
  const { customAxiosInstance } = useAxiosInstance()
  const currentDate = new Date();
  const [filters, setFilters] = useState({
    applicableMonth: months[currentDate.getMonth()].value,
    year: currentDate.getFullYear()
  })
  const [searchTerm, setSearchTerm] = useState("")

  const [total, setTotal] = useState({
    totalRental: 0,
    totalCollected: 0
  })

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }
  const fetchRentalIncome = async () => {
    if (!filters.applicableMonth && !filters.year) return
    const res = await customAxiosInstance
      .get(`/invoices?month=${filters.applicableMonth}&year=${filters.year}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`)
      .catch(err => { console.log(err) })

    const totalRental = res.data.reduce((sum, item) => {
      // Ensure the item price is a valid number
      const price = parseFloat(item.rentPayment?.amountPaid);
      if (!isNaN(price)) {
        return sum + price;
      } else {
        return sum;  // If price is invalid, return the current sum
      }
    }, 0);
    const totalCollected = res.data.reduce((sum, item) => {
      // Ensure the item price is a valid number
      const price = parseFloat(item.totalPaid);
      if (!isNaN(price)) {
        return sum + price;
      } else {
        return sum;  // If price is invalid, return the current sum
      }
    }, 0);


    setTotal({
      totalRental,
      totalCollected
    })
    return res.data
  }
  const { data: invoices, isLoading, isError, refetch } = useQuery({
    staleTime: 10000,
    queryKey: "rental-income-invoices",
    queryFn: fetchRentalIncome,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch()
    }, 2000);
    return () => clearTimeout(timer);
  }, [filters, searchTerm])

  // Function to export data to Excel
  const exportToExcel = () => {

    let filteredInvoices = [];
    for (let i = 0; i < invoices.length; i++) {
      let tempInvoice = {
        "ID Number": invoices[i].id,
        Tenant: invoices[i].stallUnit?.assignment[0]?.tenant?.firstName + " " + invoices[i].stallUnit?.assignment[0]?.tenant?.lastName,
        "Stall Name": invoices[i].stallUnit?.stallName,
        Location: invoices[i].stallUnit?.location,
        "Total Collected": invoices[i].totalPaid
      }
      filteredInvoices.push(tempInvoice)
    }


    const ws = XLSX.utils.json_to_sheet(filteredInvoices); // Convert the data array to a worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append the sheet to the workbook

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "table_data.xlsx");
  };

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
  const total_paid = (invoice) => (
    <div>
      P {invoice?.totalPaid || 0}
    </div>
  )
  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const grid = (
    <DataTable value={invoices}>
      <Column header="ID Number" field="id" />
      <Column header="Tenant" body={tenant} />
      <Column header="Stall Name" field={stallName} />
      <Column header="Location" field={location} />
      <Column header="Total Collected" body={total_paid} />
    </DataTable>
  )

  return (
    <div>
      <h1 className="text-lg font-bold">Rental Income</h1>
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
                  <h2 className="text-xl text-green-700 font-bold">Total Rental Income</h2>
                  <h1 className="text-4xl font-bold">P {total.totalRental.toFixed(2)}</h1>
                </div>
                <div>
                  <div>Peso Sign</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-1">
            <Card color="bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl text-green-700 font-bold">Total Payments Collected</h2>
                  <h1 className="text-4xl font-bold">P {total.totalCollected.toFixed(2)}</h1>
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
