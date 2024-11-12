
export default function TenantStatus({ tenantStatus }) {
  return (
    <div className={`${tenantStatus === 'active' ? 'bg-green-600' : (tenantStatus === 'pending' ? 'bg-orange-400' : 'bg-red-300')} rounded-xl w-min px-2 py-1 text-white capitalize`}>
      {tenantStatus}
    </div>
  )
}
