import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { RxArchive } from "react-icons/rx";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import TenantStatus from "../../../shared/components/tenant-status/tenant-status";

export default function ApprovalQueue() {
  const { customAxiosInstance } = useAxiosInstance()
  const [searchTerm, setSearchTerm] = useState()
  const navigate = useNavigate()
  const fetchAccounts = async () => {
    const response = await customAxiosInstance.get(`/users/get-pending?searchTerm=${searchTerm || ''}`);
    return response.data;
  };

  const handleApproveTenant = async (id, status) => {
    await customAxiosInstance.patch(`/tenant/update-tenant-status/${id}`, {
      id,
      status
    }).then((res) => {
      if (res.status === 200) {
        refetch();
      }
    }).catch(err => {
      alert(err)
    })
  }
  const {
    data: users,
    isLoading,
    error,
    refetch
  } = useQuery("listUsers", fetchAccounts);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch()
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchTerm])


  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;

  const image = (tenant) => (
    <div className="w-14 h-14 rounded-full bg-white border-2 border-green-500">
      <image alt="tenant-image" />
    </div>
  )
  const name = (tenant) => (
    <div className="capitalize">
      {tenant.firstName} {tenant.lastName}
    </div>
  )
  const editStatus = (tenant) => (
    <div className="capitalize">
      {/* <DropDown name="status" id={tenant.id} options={statusDropdown} selected={tenant.status} /> */}
      <TenantStatus tenantStatus={tenant.status} />
    </div>
  )
  const action = (tenant) => (
    <div className="flex space-x-2">
      <button onClick={() => navigate(`../approve-tenant/${tenant.id}`)}>
        <IoEyeSharp className="text-green-700 text-xl" />
      </button>
      <div className="space-x-2">
        <button
          className="bg-green-600 hover:bg-green-700 rounded-full px-4 py-2 text-white"
          onClick={() => handleApproveTenant(tenant.id, 'active')}>
          Approve
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 text-white"
          onClick={() => handleApproveTenant(tenant.id, 'rejected')}>
          Reject
        </button>
      </div>
    </div>
  )
  const grid = (
    <DataTable value={users} className="border-b py-2">
      <Column header="" body={image} />
      <Column header="Name" body={name} />
      <Column header="Status" body={editStatus} />
      <Column header="Action" body={action} />
    </DataTable>
  );
  return (
    <div className="space-y-5">
      <div className="flex justify-end">
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
