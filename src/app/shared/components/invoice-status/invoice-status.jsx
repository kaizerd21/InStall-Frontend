
export default function InvoiceStatus({ invoiceStatus }) {
  return (
    <div className={`${invoiceStatus === 'paid' ? 'bg-green-600' : (invoiceStatus === 'unpaid' ? 'bg-orange-400' : 'bg-red-300')} rounded-xl w-min px-2 text-white capitalize`}>
      {invoiceStatus}
    </div>
  )
}
