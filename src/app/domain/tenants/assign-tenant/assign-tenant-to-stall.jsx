import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { authToken, BASE_URL, useAxiosInstance } from "../../../core/main-api";
import { PrimaryButton } from "../../../shared/components";
import { Card } from "../../../shared/components/card/card";
import { DropDown } from "../../../shared/components/drop-down/drop-down";
import { InputFieldSecondary } from "../../../shared/components/inputFields/inputFields";
import axios from "axios";

export function AssignTenantToStall() {
  const { register, handleSubmit } = useForm();
  const { customAxiosInstance } = useAxiosInstance();
  const navigate = useNavigate();

  const handleGetStalls = async () => {
    const response = await customAxiosInstance.get(`/stall-units/get-available-stalls`);
    return response.data;
  };
  const { data: stalls } = useQuery({
    staleTime: 10000,
    queryKey: "stallIds",
    queryFn: handleGetStalls,
  });

  const { data: tenants } = useQuery({
    staleTime: 10000,
    queryKey: "tenantIds",
    queryFn: async () => {
      const response = await customAxiosInstance.get(
        `/tenant/get-unassigned-tenants`, {
      }
      );
      return response.data;
    },
  });

  const handleAssignTenant = async (data) => {
    await customAxiosInstance.post(
      `/tenant/assign-tenant-to-stall`,
      data
    ).then(res => {
      if (res.status === 201) {
        navigate(`/managemnet/tenants`)
      }
    })
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Assign a Stall Unit to Tenant</h1>
      <Card>
        <form onSubmit={handleSubmit(handleAssignTenant)} className="space-y-5">
          <div className="w-1/2 space-y-3">
            <h2 className="text-green-700 text-2xl font-bold">
              Allocate Stall Units
            </h2>
            <DropDown
              title={"Stall Unit"}
              customInputClasses={'w-2/3'}
              name="stallId"
              options={stalls}
              rounded={false}
              selected={null}
              disabled={false}
              register={register}
              title_key="stallName"
              value_key="id"
            />
            <DropDown
              title={"Tenant"}
              customInputClasses={'w-2/3'}
              name="tenantId"
              options={tenants}
              rounded={false}
              selected={null}
              disabled={false}
              register={register}
              title_key="fullName"
              value_key="id"
            />
          </div>
          <div className="w-1/2 space-y-3">
            <h2 className="text-green-700 text-2xl font-bold">
              Important Details
            </h2>
            <InputFieldSecondary
              title={"Monthly Rent"}
              customInputClasses={'w-2/3'}
              placeholder={0.0}
              name="monthlyRent"
              type="number"
              register={register}
            />
            <InputFieldSecondary
              title={"Placement Date"}
              customInputClasses={'w-2/3'}
              placeholder={"Placement Date"}
              name="contractDate"
              type="date"
              register={register}
            />
          </div>
          <div className="flex justify-end">
            <div className="flex space-x-2">
              <a
                href="/management/tenants"
                className="bg-secondary px-4 py-2 text-white rounded-full shadow-md"
              >
                Cancel
              </a>
              <PrimaryButton buttonText={"Register"} />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
