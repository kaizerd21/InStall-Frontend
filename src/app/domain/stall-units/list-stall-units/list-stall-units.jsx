import { NavLink, useNavigate } from "react-router-dom"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useState } from "react"
import { FiPlus, FiSearch } from "react-icons/fi"
import { RxArchive } from "react-icons/rx";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useQuery } from "react-query"
import { useAxiosInstance } from "../../../core/main-api"
import { Card } from "../../../shared/components/card/card"


export function ListStallUnits() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const { customAxiosInstance } = useAxiosInstance()


  const fetchStallUnits = async () => {
    const response = await customAxiosInstance.get(`/stall-units${searchTerm && `?searchTerm=${searchTerm}`}`)
    console.log(response.data)
    return response.data
  }

  const {
    data: stall_units,
    isLoading,
    error,
  } = useQuery("listStallUnits", fetchStallUnits)


  const showAddUnit = (
    <div className="flex justify-start my-4">
      <NavLink to="create-stall-unit" className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-full">
        <FiPlus />
        Create Stall Unit
      </NavLink>
    </div>
  )
  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;
  const searchField = (
    <div className="flex items-center border-[1px] border-green-700 bg-white" >
      <FiSearch className="text-2xl text-green-700 m-2" />
      <input type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
    </div>
  )
  const action = (stallUnit) => (
    <div className="flex space-x-2">
      <button onClick={() => navigate(`view-stall-unit/${stallUnit.id}`)}>
        <IoEyeSharp className="text-green-700 text-xl" />
      </button>
      <button onClick={() => navigate(`edit-stall-unit/${stallUnit.id}`)}>
        <FaRegEdit className="text-green-700 text-xl" />
      </button>
      <button>
        <RxArchive className="text-green-700 text-xl" />
      </button>
    </div>
  )
  const grid = (
    <DataTable value={stall_units}>
      <Column header="Stall #" field="id" />
      <Column header="Stall Name" field="stallName" />
      <Column header="Location" field="location" />
      <Column header="Monthly Rent" field="rentalFee" />
      <Column header="Status" field="status" />
      <Column header="Action" body={action} />
    </DataTable>
  )

  return (
    <div>
      {user.userType === "audit-clerk" && showAddUnit}
      <Card>
        <div className="flex justify-end mb-4">
          {searchField}
        </div>
        <div>
          {grid}
          {error && !isLoading && showError}
          {isLoading && showLoading}
        </div>
      </Card>
    </div>
  )
}
