import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import CreateInvoiceModal from "./create-invoice-modal";
import { IoClose } from "react-icons/io5";
import { modalFieldsOptions, options } from "./invoice-options";
import { months, years } from "../../../core/global-options";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function CreateInvoice() {
  const { customAxiosInstance } = useAxiosInstance()
  const navigate = useNavigate()

  const [showOptions, setShowOptions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalFields, setModalFields] = useState([])
  const [modalTitle, setModalTitle] = useState("")
  const [invoices, setInvoices] = useState([])
  const [stallData, setStallData] = useState({})
  const [stallId, setStallId] = useState(null)
  const [mainInvoiceData, setMainInvoiceData] = useState({
    stallId: null,
    applicableMonth: null,
    year: null,
    balance: null,
    rentalAmount: null,
    status: null,
    misc: {},
    stallElectricity: {},
    water: {},
    rentPayment: {},
  })

  const fetchStallUnits = async () => {
    const res = await customAxiosInstance.get(`/stall-units`)
    return res.data
  }
  const { data: stallUnits } = useQuery({
    staleTime: 10000,
    queryKey: "stallIds",
    queryFn: fetchStallUnits,
  })


  useEffect(() => {
    if (!stallId) return
    customAxiosInstance.get(`/stall-units/${stallId}`).then(res => {
      console.log(res)
      if (res.status === 200) {
        setStallData(res.data)
      }
    })
  }, [stallId])


  const handleInputChange = (e) => {
    if (e.target.name === "stallId") {
      setStallId(e.target.value)
    }
    setMainInvoiceData({
      ...mainInvoiceData,
      [e.target.name]: e.target.value,
    })
  }
  const handleMainInvoice = async () => {
    setMainInvoiceData({
      ...mainInvoiceData,
    })
    const response = await customAxiosInstance.post(`/invoices`,
      mainInvoiceData,
    ).then(res => {
      if (res.status === 201) navigate(`../list-invoice`)
      // return res.data
    }).catch(err => {
      return {
        message: "Something went wrong"
      }
    })
  }
  const handleCreateInvoice = (data) => {
    setInvoices([...invoices, data])
    setMainInvoiceData({
      ...mainInvoiceData,
      [data.billType]: data,
    })
    setShowModal(false)
  }
  const handleOptionClick = (e) => {
    setModalTitle(e.target.innerText)
    setModalFields(modalFieldsOptions[e.target.name])
    setShowOptions(false)
    setShowModal(true)
  }
  const invoiceNumber = (invoice) => (
    <div>
      {invoice.id}
    </div>
  )
  const particulars = (invoice) => (
    <div className="capitalize">
      {invoice.billType}
    </div>
  )
  const totalAmountBill = (invoice) => (
    <div>
      {invoice.amountIncurred || invoice.amount || invoice.amountPaid}
    </div>
  )
  const action = () => (
    <div>
      actions
    </div>
  )
  const createInvoiceOptions = (
    <div className="absolute flex flex-col right-[7em] bg-white shadow-lg rounded-xl overflow-hidden">
      {options.map(option => (
        <button onClick={handleOptionClick} name={option.key} key={option.key} className="bg-green-700 hover:bg-green-600 text-white py-2 px-1 w-full text-left">{option.text}</button>
      ))}
    </div>
  )

  const createInvoiceModal = (
    <div className="absolute z-10 flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500/[0.5]">
      <div className={`flex flex-col bg-white shadow-md rounded-md p-4`}>
        <div className="flex justify-end">
          <button onClick={() => setShowModal(false)}>
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div>
          <CreateInvoiceModal title={modalTitle} fields={modalFields} handleCreateInvoice={handleCreateInvoice} />
        </div>
      </div>
    </div>
  )

  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const grid = (
    <DataTable value={invoices} className="border-b py-2">
      <Column header="#" body={invoiceNumber} />
      <Column header="Particulars" body={particulars} />
      <Column header="Amount Incurred" body={totalAmountBill} />
      <Column header="Action" body={action} />
    </DataTable>
  );
  return (
    <div className="space-y-4">
      {showModal && createInvoiceModal}
      <div className="flex justify-between">
        <div>
          <h1>Create Invoice For Each Occupied Stall Unit</h1>
        </div>
        <div>
          <button className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={handleMainInvoice}>
            Save Invoice
          </button>
        </div>
      </div>
      <div>
        <Card>
          <div>
            <h1 className="text-2xl text-green-700 font-semibold">Allocate Units</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className={`flex flex-col w-full`}>
              <label className="text-left">Stall Unit</label>
              <select
                name="stallId"
                value={mainInvoiceData.stallId}
                onChange={handleInputChange}
                className="w-full bg-inputfield_color px-4 py-2 focus:outline-none border-[1px] border-green-700">
                <option value={""} disabled selected>Select Stall</option>
                {stallUnits?.map(option => (
                  <option value={option["id"]} key={option["id"]}>{option["stallName"]}</option>
                ))}
              </select>
            </div>
            <div className={`flex flex-col w-full`}>
              <label className="text-left">Select Month</label>
              <select
                name="applicableMonth"
                value={mainInvoiceData.applicableMonth}
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
                value={mainInvoiceData.year}
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
      {stallData?.rentalFee ? (
        <div>
          <Card>
            <div>
              <h1 className="text-2xl text-green-700 font-semibold">Stall Data</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex justify-between">
                  <h2 className="font-semibold text-green-700">Monthly Rental Fee:</h2>
                  <h2>P {stallData?.rentalFee}</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="font-semibold text-green-700">Location:</h2>
                  <h2>{stallData?.location}</h2>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <h2 className="font-semibold text-green-700">Status:</h2>
                  <h2>{stallData?.status}</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="font-semibold text-green-700">Description:</h2>
                  <h2>{stallData?.description}</h2>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
      <hr />
      <div>
        <Card>
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl">Utilities and Miscellaneous Fees</h1>
              <p>Include expenses when generating invoice</p>
            </div>
          </div>
          <div>
            {grid}
            {/* {error && !isLoading && showError} */}
            {/* {isLoading && showLoading} */}
          </div>
          <div>
            <div className="flex justify-end my-4">
              <div className="relative">
                {showOptions && createInvoiceOptions}
                <button onClick={() => setShowOptions(true)} className="flex items-center bg-gray-500 text-white font-semibold py-2 px-4 rounded-full">
                  <FiPlus />
                  Add Bill
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
