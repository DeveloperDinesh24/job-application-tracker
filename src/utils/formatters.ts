export const formatCurrency = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const salaryForDB = (salary: string) => Number(salary.replace(/,/g, ''))
