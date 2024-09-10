import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FiPlus, FiSearch } from "react-icons/fi";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { NavLink } from "react-router-dom";

import { useAxiosInstance } from "../../../core/main-api";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import { AuthFunctions } from "../../../core/query/login-query";
import { statusDropdown } from "../accounts";

export function ListAccounts() {
  const { customAxiosInstance } = useAxiosInstance()

  const [userTypeFilter, setUserTypeFilter] = useState("admin");
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

  const imageAndName = (user) => (
    <div>
      {/* <img /> */}
      {user.firstName} {user.lastName}
    </div>
  )
  const editStatus = (user) => (
    <div>
      <DropDown name="status" id={user.id} options={statusDropdown} selected={user.status} />
    </div>
  )
  const action = (user) => (
    <div>
      actions here
    </div>
  )
  const grid = (
    <DataTable value={users} className="border-b py-2">
      <Column header="Name" body={imageAndName} />
      <Column header="Status" body={editStatus} />
      <Column header="Action" body={action} />
    </DataTable>
  );

  return (
    <div className="space-y-5">
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
  );
}
