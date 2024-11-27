import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { RxArchive } from "react-icons/rx";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import TenantStatus from "../../../shared/components/tenant-status/tenant-status";


export function ListTenants({ isArchived = false }) {
  const { customAxiosInstance } = useAxiosInstance()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()


  const fetchAccounts = async () => {
    const response = await customAxiosInstance.get(`/tenant/get-all${isArchived ? `?status=archived` : '?status='}${searchTerm !== '' ? `&searchTerm=${searchTerm}` : ''}`);
    return response.data;
  };
  const {
    data: users,
    isLoading,
    error,
    refetch
  } = useQuery({
    staleTime: 3000,
    queryKey: isArchived ? "listArchivedUsers" : "listUsers",
    queryFn: fetchAccounts
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch()
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchTerm])

  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;

  const imageAndName = (user) => (
    <div className="capitalize">
      {/* <img /> */}
      {user.firstName} {user.lastName}
    </div>
  )
  const editStatus = (user) => (
    <div className="capitalize">
      {/* <DropDown name="status" id={user.id} options={statusDropdown} selected={user.status} /> */}
      <TenantStatus tenantStatus={user.status} />
    </div>
  )
  const action = (tenant) => (
    <div className="flex space-x-2">
      <button onClick={() => navigate(`view-tenant/${tenant.id}`)}>
        <IoEyeSharp className="text-green-700 text-xl" />
      </button>
      <button onClick={() => navigate(`edit-tenant/${tenant.id}`)}>
        <FaRegEdit className="text-green-700 text-xl" />
      </button>
      <button>
        <RxArchive className="text-green-700 text-xl" />
      </button>
    </div>
  )
  const assignedStall = (user) => (
    <div>
      <div>
        {user.tenantAssignment?.stall.stallName}
      </div>
    </div>
  )
  const grid = (
    <DataTable value={users} className="border-b py-2">
      <Column header="Name" body={imageAndName} />
      <Column header="Status" body={editStatus} />
      <Column header="Assigned Stall" body={assignedStall} />
      <Column header="Action" body={action} />
    </DataTable>
  )
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        {isArchived ? (
          <div>
            <h2 className="text-lg my-2">Archived Tenants</h2>
          </div>
        ) : (
          <button onClick={() => navigate("create-tenant")} className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-full">
            <FiPlus />
            New Account
          </button>
        )}
        <div className="flex items-center border-[1px] border-green-700 bg-white" >
          <FiSearch className="text-2xl text-green-700 m-2" />
          <input onChange={(e) => { setSearchTerm(e.target.value) }} type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
        </div>
      </div>

      <Card>
        {grid}
        {error && !isLoading && showError}
        {isLoading && showLoading}
      </Card>

    </div>
  )
}
