import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FiPlus, FiSearch } from "react-icons/fi";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from "react-router-dom";

import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import TenantStatus from "../../../shared/components/tenant-status/tenant-status";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RxArchive } from "react-icons/rx";
import AccountDetails from "../account-details/account-details";

export function ListAccounts() {
  const navigate = useNavigate()
  const { customAxiosInstance } = useAxiosInstance()
  const [userTypeFilter, setUserTypeFilter] = useState("admin");

  const [selectedUser, setSelectedUser] = useState(null)

  const userTypes = [
    {
      value: "admin",
      label: "Administrators",
    },
    {
      value: "audit-clerk",
      label: "Audit Clerks",
    },
    {
      value: "accounting-clerk",
      label: "Accounting Clerks",
    },
    {
      value: "tenant",
      label: "Tenant",
    },
  ];
  const fetchAccounts = async () => {
    const response = await customAxiosInstance.get(`/users?userType=${userTypeFilter}`);
    return response.data;
  };
  const {
    data: users,
    isLoading,
    error,
    refetch
  } = useQuery("listUsers", fetchAccounts);

  useEffect(() => {
    refetch()
  }, [userTypeFilter])


  const handleSelectUser = async (user) => {
    await customAxiosInstance.get(`/users/${user.id}`).then(res => {
      if (res.status === 200) {
        setSelectedUser(res.data)
      }
    })
  }
  const handleDeselect = () => {
    setSelectedUser(null)
  }

  const userTypeSelector = (
    <div className="flex justify-evenly bg-white w-full rounded-full shadow-md">
      {userTypes.map((userType) => (
        <button
          key={userType.value}
          onClick={() => setUserTypeFilter(userType.value)}
          className={`${userType.value === userTypeFilter
            ? "bg-green-700 text-white font-semibold"
            : "text-gray-500"
            } py-2 w-full rounded-full`}
        >
          {userType.label}
        </button>
      ))}
    </div>
  );

  const showLoading = <div>Loading...</div>;
  const showError = <div>Error Loading...</div>;

  const image = (user) => (
    <div>
      <image alt="user-image" className="w-20 h-20 rounded-full bg-green-600" />
    </div>
  )
  const name = (user) => (
    <div className="capitalize">
      {user.firstName} {user.lastName}
    </div>
  )
  const editStatus = (user) => (
    <div>
      <TenantStatus tenantStatus={user.status} />
    </div>
  )
  const action = (user) => (
    <div className="flex space-x-2">
      <button onClick={() => { handleSelectUser(user) }}>
        <IoEyeSharp className="text-green-700 text-xl" />
      </button>
      {userTypeFilter !== "tenant" && (
        <>
          <button onClick={() => navigate(`edit-user/${user.id}`)}>
            <FaRegEdit className="text-green-700 text-xl" />
          </button>
          <button>
            <RxArchive className="text-green-700 text-xl" />
          </button>
        </>
      )}
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
    <div className="flex gap-2">
      <div className="flex-1 space-y-5">
        {userTypeSelector}

        <div className="flex justify-between">
          <NavLink to="create-account" className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-full">
            <FiPlus />
            New Account
          </NavLink>
          <div className="flex items-center border-[1px] border-green-700 bg-white" >
            <FiSearch className="text-2xl text-green-700 m-2" />
            <input type="text" name="searchTerm" className="h-full focus:outline-none" placeholder="Search" />
          </div>
        </div>

        <Card>
          {grid}
          {error && !isLoading && showError}
          {isLoading && showLoading}
        </Card>

      </div>
      {selectedUser ?
        <AccountDetails user={selectedUser} handleDeselect={handleDeselect} />
        : null}
    </div>
  );
}
