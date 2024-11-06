function generateArrayOfYears() {
  var max = new Date().getFullYear()
  var min = max - (max - 2000)
  var years = []

  for (var i = max; i >= min; i--) {
    years.push({
      title: i,
      value: i,
    })
  }
  return years
}


export const years = generateArrayOfYears()


export const months = [
  {
    title: "January",
    value: "January",
  },
  {
    title: "February",
    value: "February",
  },
  {
    title: "March",
    value: "March",
  },
  {
    title: "April",
    value: "April",
  },
  {
    title: "May",
    value: "May",
  },
  {
    title: "June",
    value: "June",
  },
  {
    title: "July",
    value: "July",
  },
  {
    title: "August",
    value: "August",
  },
  {
    title: "September",
    value: "September",
  },
  {
    title: "October",
    value: "October",
  },
  {
    title: "November",
    value: "November",
  },
  {
    title: "December",
    value: "December",
  },
]
