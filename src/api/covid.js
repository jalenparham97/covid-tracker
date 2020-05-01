import axios from 'axios'

const baseURL = 'https://corona.lmao.ninja/v2'

export const getAllStats = async () => {
  const stats = await axios.get(`${baseURL}/all`)
  return stats.data
}

export const getCountryData = async () => {
  const stats = await axios.get(`${baseURL}/countries`)
  return stats.data
}

export const getCountry = async (country) => {
  const stats = await axios.get(`${baseURL}/countries/${country}`)
  return stats.data
}

export const getContinents = async () => {
  const stats = await axios.get(`${baseURL}/continents`)
  return stats.data
}
