import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { months } from "../../../core/global-options";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";


export default function ListElectricityInvoices() {
  const { customAxiosInstance } = useAxiosInstance()
  const date_today = new Date();
  const month = months[date_today.getMonth()]
  const [total, setTotal] = useState(0)

  const fetchElectricityInvoices = async () => {
    const response = await customAxiosInstance.get(`/main-electricity/${date_today.getMonth() + 1}`);
    return response.data;
  };
  const {
    data: electricityInvoices,
    isLoading,
    error,
    // refetch
  } = useQuery(
    {
      staleTime: 10000,
      queryKey: "ListElectricityInvoices",
      queryFn: fetchElectricityInvoices,
    });

  useEffect(() => {
    let temp_total = 0
    try {
      for (let i = 0; i < electricityInvoices.length; i++) {
        temp_total += electricityInvoices[i].totalAmountBill
      }
      setTotal(temp_total.toFixed(2))
    }
    catch {
      return;
    }
  }, [electricityInvoices])

  const invoiceNumber = (invoice) => (
    <div>
      {invoice.id}
    </div>
  )
  const readingDate = (invoice) => (
    <div>
      {invoice.readingDate}
    </div>
  )
  const kwhrUsage = (invoice) => (
    <div>
      {invoice.kwhrUsage}
    </div>
  )
  const kwhrRate = (invoice) => (
    <div>
      {invoice.kwhrRate}
    </div>
  )
  const totalAmountBill = (invoice) => (
    <div>
      {invoice.totalAmountBill}
    </div>
  )

  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const grid = (
    <DataTable value={electricityInvoices} className="border-b py-2">
      <Column header="#" body={invoiceNumber} />
      <Column header="Reading Date" body={readingDate} />
      <Column header="KwHr Usage" body={kwhrUsage} />
      <Column header="KwHr Rate" body={kwhrRate} />
      <Column header="Total Amount Bill" body={totalAmountBill} />
    </DataTable>
  );
  return (
    <div className="space-y-4">
      <h1>Electricity Bill</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-semibold">
                {month.title}
              </h1>
              <h2 className="text-lg font-semibold text-green-600">
                Current Month
              </h2>
            </div>
            <div className="flex items-center">
              Icon here
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-semibold">
                P {total}
              </h1>
              <h2 className="text-lg font-semibold text-green-600">
                Current Total Amount Bill
              </h2>
            </div>
            <div className="flex items-center">
              Icon here
            </div>
          </div>
        </Card>
      </div>
      <hr />
      <div>
        <Card>
          <div className="flex justify-between">
            <div>
              <div className="flex justify-start">
                <NavLink to="../create-electricity-invoice" className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-full">
                  <FiPlus />
                  Create Bill
                </NavLink>
              </div>
            </div>
            <div className="flex items-center border-[1px] border-green-700 bg-white" >
              <FiSearch className="text-2xl text-green-700 m-2" />
              <input type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
            </div>
          </div>
          <div>
            {grid}
            {error && !isLoading && showError}
            {isLoading && showLoading}
          </div>
        </Card>
      </div>
    </div>
  )
}
