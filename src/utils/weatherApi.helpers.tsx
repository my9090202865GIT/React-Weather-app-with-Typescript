
import axiosInstance from "./https"
let COUNTRY_BASE_URL = "https://restcountries.com/v3.1/name/"
let WEATHER_BASE_URL = "http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query="
export const getcountrydata = async (name: any) => {
    try {

        const response = await axiosInstance.get(`${COUNTRY_BASE_URL + name}`)
        if (response.status === 200) {
            return response.data[0];
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getweatherdetails = async (capitalName: string) => {
    try {
        const response = await axiosInstance.get(
            `${WEATHER_BASE_URL + capitalName}`
        );
        if (response.status === 200) {
            return response.data.current
        }

    } catch (error) {
        console.error(error)
        return null
    }
}