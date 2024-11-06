
export const options = [
  {
    text: "Rent Payment",
    key: "rentPayment",
  },
  {
    text: "Electricity",
    key: "electricity",
  },
  {
    text: "Water",
    key: "water",
  },
  {
    text: "Miscellaneous Fee",
    key: "miscellaneous_fee",
  },
]
export const modalFieldsOptions = {
  electricity: [
    {
      placeholder: "Bill Type",
      name: "billType",
      defaultValue: "stallElectricity",
      type: "text",
      isHidden: true,
    },
    {
      placeholder: "Previous Reading",
      name: "prevReading",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
    {
      placeholder: "Present Reading",
      name: "presReading",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
    {
      placeholder: "Kwhr Usage",
      name: "kwhrUsage",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
    {
      placeholder: "Amount Incurred",
      name: "amountIncurred",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
  ],
  water: [
    {
      placeholder: "Bill Type",
      name: "billType",
      defaultValue: "water",
      type: "text",
      isHidden: true,
    },
    {
      placeholder: "Reading Date",
      name: "readingDate",
      type: "date",
      isHidden: false,
      inputRules: {
        valueAsDate: true,
      }
    },
    {
      placeholder: "Amount Incurred",
      name: "amount",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
  ],
  rentPayment: [
    {
      placeholder: "Bill Type",
      name: "billType",
      defaultValue: "rentPayment",
      type: "text",
      isHidden: true,
    },
    {
      placeholder: "Payment Date",
      name: "datePaid",
      type: "date",
      isHidden: false,
      inputRules: {
        valueAsDate: true,
      }
    },
    {
      placeholder: "Amount Paid",
      name: "amountPaid",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
    {
      placeholder: "Description",
      name: "description",
      type: "text",
      isHidden: false,
    }
  ],
  miscellaneous_fee: [
    {
      placeholder: "Bill Type",
      name: "billType",
      defaultValue: "misc",
      type: "text",
      isHidden: true,
    },
    {
      placeholder: "Payment Date",
      name: "datePaid",
      type: "date",
      isHidden: false,
      inputRules: {
        valueAsDate: true,
      }
    },
    {
      placeholder: "Amount Paid",
      name: "amount",
      type: "number",
      isHidden: false,
      inputRules: {
        valueAsNumber: true,
      }
    },
    {
      placeholder: "Description",
      name: "particulars",
      type: "text",
      isHidden: false,
    }
  ],
}
