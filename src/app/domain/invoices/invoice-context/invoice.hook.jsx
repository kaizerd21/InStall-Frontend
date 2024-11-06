const data = {
  stallId: null,
  applicableMonth: null,
  balance: null,
  rentalAmount: null,
  status: null,
  misc: {
    billType: null,
    invoiceId: null,
    particulars: null,
    amount: null,
  },
  stallElectricity: {
    billType: null,
    invoiceId: null,
    presReading: null,
    prevReading: null,
    kwhrUsage: null,
    amountPerStall: null,
  },
  water: {
    billType: null,
    invoiceId: null,
    readingDate: null,
    amount: null,
  },
  rentPayment: {
    billType: null,
    employeeId: null,
    invoiceId: null,
    datePaid: null,
    amountPaid: null,
    description: null,
  },
}
export const useInvoices = () => {
  const handleSubmitInvoice = async (formData, customAxiosInstance) => {
    const response = await customAxiosInstance.post(`/invoices`,
      formData,
    ).then(res => {
      return response.data
    }).catch(err => {
      return {
        message: "Something went wrong"
      }
    })
  }

  return {
    handleSubmitInvoice,
  }
}
