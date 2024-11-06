import { useState } from "react";
import { months, years } from "../../../core/global-options";
import { Card } from "../../../shared/components/card/card";
import ListInvoices from "../list-invoice/list-invoices";


export default function ListInvoicesForPayment() {
  const currentDate = new Date();
  const [invoiceFilter, setInvoiceFilter] = useState({
    applicableMonth: months[currentDate.getMonth()].value,
    year: currentDate.getFullYear()
  })

  const handleInputChange = (e) => {
    setInvoiceFilter({
      ...invoiceFilter,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div>
      <div className="mb-2">
        <Card>
          <div className="flex justify-between">
            <h1 className="text-2xl text-green-700 font-semibold">Payment Per Stall Unit - Monthly Basis</h1>
          </div>
          <div className="flex space-x-2">
            <div className={`flex flex-col w-full`}>
              <label className="text-left">Select Month</label>
              <select
                name="applicableMonth"
                value={invoiceFilter.applicableMonth}
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
                value={invoiceFilter.year}
                onChange={handleInputChange}
                className="w-full bg-inputfield_color px-4 py-2 focus:outline-none border-[1px] border-green-700">
                <option value={""} disabled selected>Select Year</option>
                {years?.map(option => (
                  <option value={option.value} key={option.value}>{option.title}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>
      <ListInvoices optionalFilter={invoiceFilter} />
    </div>
  )
}
