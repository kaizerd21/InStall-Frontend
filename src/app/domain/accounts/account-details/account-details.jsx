import { Card } from "../../../shared/components/card/card";


export default function AccountDetails({ user, handleDeselect }) {
  return (
    <div className="flex-1">
      <Card noPadding={true} color="bg-white">
        <div className="w-full p-0 relative h-28 flex justify-center">
          <img src="" alt="" className="absolute -top-10 w-[10em] h-[10em] rounded-full bg-green-600" />
        </div>
        <div className="flex justify-center my-5">
          <h1 className="capitalize text-4xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
        </div>
        <div className="flex justify-center mb-5">
          <h2 className="capitalize text-xl text-green-700 font-medium">
            {user?.userType}
          </h2>
        </div>
        <div className="mb-5 mx-20">
          <h2 className="capitalize text-lg text-green-700 font-medium">
            Mobile Number:
          </h2>
          <h2 className="capitalize text-lg font-medium">
            {user?.phoneNumber || "None"}
          </h2>
        </div>
        <div className="mb-5 pb-5 mx-20 border-b border-green-700">
          <h2 className="capitalize text-lg text-green-700 font-medium">
            Email Address:
          </h2>
          <h2 className="text-lg font-medium">
            {user?.email || "None"}
          </h2>
        </div>
        <div className="mb-5 pb-5 mx-20">
          <h2 className="capitalize text-lg text-green-700 font-medium">
            ID Number:
          </h2>
          <h2 className="text-lg font-medium">
            {user?.id || "None"}
          </h2>
        </div>
      </Card>
      <div className="flex justify-end mt-5">
        <button
          onClick={handleDeselect}
          className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg">
          Close
        </button>
      </div>
    </div>
  )
}
