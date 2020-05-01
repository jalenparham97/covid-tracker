export const returnDataArray = (data, value) => data.map((item) => item[value])

export const formatNumber = (num) => new Intl.NumberFormat().format(num)
