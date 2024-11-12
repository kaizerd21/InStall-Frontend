
export default function StallUnitStatus({ stallUnitStatus }) {
  return (
    <div className={`${stallUnitStatus === 'occupied' ? 'bg-green-600' : (stallUnitStatus === 'vacant' ? 'bg-orange-400' : 'bg-red-300')} rounded-xl w-min px-2 py-1 text-white capitalize`}>
      {stallUnitStatus}
    </div>
  )
}
