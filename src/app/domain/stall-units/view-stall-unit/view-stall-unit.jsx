import { useParams } from "react-router-dom";
import { Card } from "../../../shared/components/card/card";
import { useAxiosInstance } from "../../../core/main-api"
import { useQuery } from "react-query";

import { FaRegEdit } from "react-icons/fa";
import { RxArchive } from "react-icons/rx";
import { IoStorefrontOutline } from "react-icons/io5";
import { VscBlank } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineDescription } from "react-icons/md";

export function ViewStallUnit() {
  const { stallID } = useParams()
  const { customAxiosInstance } = useAxiosInstance()

  const handleFetchStall = async () => {
    const response = await customAxiosInstance.get(`/stall-units/${stallID}`)
    return response.data
  }

  const { data: stall, isLoading, error } = useQuery('stallUnit', handleFetchStall)


  const showLoading = (
    <div>Loading...</div>
  )
  const showError = (
    <div>Error Loading Data...</div>
  )
  const properties = (
    <div className="space-y-4">
      <StallProperty
        label="Stall Number:"
        value={stall?.id}
        icon={<VscBlank className="text-3xl text-green-700" />}
      />
      <StallProperty
        label="Stall Name:"
        value={stall?.stallName}
        icon={<IoStorefrontOutline className="text-3xl text-green-700" />}
      />
      <StallProperty
        label="Tenant:"
        value={"None: TODO"}
        icon={<FaRegUser className="text-3xl text-green-700" />}
      />
      <StallProperty
        label="Location:"
        value={stall?.location}
        icon={<LuMapPin className="text-3xl text-green-700" />}
      />
      <StallProperty
        label="Monthly Rent:"
        value={stall?.rentalFee}
        icon={<GiReceiveMoney className="text-3xl text-green-700" />}
      />
      <StallProperty
        label="Status:"
        value={stall?.status}
        icon={<GrStatusGood className="text-3xl text-green-700" />}
      />
      <StallProperty
        label="Description:"
        value={stall?.description}
        icon={<MdOutlineDescription className="text-3xl text-green-700" />}
      />
    </div>
  )

  const gallery = (
    <div></div>
  )

  return (
    <div>
      {/* <h1 className="text-3xl font-bold">Stall Unit Details</h1> */}
      <div className="flex justify-between my-2 items-center">
        <button className="bg-blue-500 text-white text-lg font-medium rounded-full px-4 py-1">
          Place Tenant
        </button>
        <div className="space-x-2">
          <button className="bg-green-700 text-white rounded-full px-4 py-1">
            <div className="flex items-center">
              <FaRegEdit className="mr-1" />
              Edit
            </div>
          </button>
          <button className="bg-red-500 text-white rounded-full px-4 py-1">
            <div className="flex items-center">
              <RxArchive className="mr-1" />
              Archive
            </div>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card color="bg-white">
          {isLoading && showLoading}
          {!isLoading && error && showError}
          {!isLoading && !error && properties}
        </Card>
        <Card color="bg-white">
          <h1>Gallery: TODO</h1>
          {isLoading && !error && showLoading}
          {!isLoading && error && showError}
          {!isLoading && !error && gallery}
        </Card>
      </div>
    </div>
  )
}

function StallProperty({ value, label, icon }) {
  return (
    <div className="stall-info flex items-center space-x-4">
      {icon}
      <div className="details flex flex-col">
        <h4 className="text-green-700 text-lg font-medium">{label}</h4>
        <h5>{value}</h5>
      </div>
    </div>
  )
}
