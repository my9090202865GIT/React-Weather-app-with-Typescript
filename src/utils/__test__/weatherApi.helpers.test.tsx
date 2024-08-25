import axiosInstance from "../https";
import { getcountrydata, getweatherdetails } from "../weatherApi.helpers";
import { countryMockData } from "../../mock/countryMockData";
import { weatherMockData } from "../../mock/weatherMockData";
jest.mock('../https')

describe("weatherApi helper test", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock data after each test to avoid interference
    });

    it("countrygetdata successful api call", async () => {
        (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
            status: 200,
            data: [countryMockData],
        })
        const data = await getcountrydata("India")
        expect(axiosInstance.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/India');
        expect(data).toEqual(countryMockData)
    })
    it("should return null when api call fails", async () => {
        (axiosInstance.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))
        const data = await getcountrydata("India")
        expect(data).toEqual(null)
    })
    it("should return null when status code not equal to 200", async () => {
        (axiosInstance.get as jest.Mock).mockRejectedValueOnce({
            status: 404,
            data: []
        })
        const data = await getcountrydata("India")
        expect(data).toEqual(null)
    })

    it("getWeatherData successful api call", async () => {
        (axiosInstance.get as jest.Mock).mockReturnValueOnce({
            data: {
                current: weatherMockData
            },
            status: 200
        })
        const response = await getweatherdetails("India")
        expect(response).toEqual(weatherMockData)
    })
    it("getWeatherData unsuccessful api call", async () => {
        (axiosInstance.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))
        const res=await getweatherdetails("India")
        expect(res).toEqual(null)
    })
    it("should return null when status code not equal to 200", async () => {
        (axiosInstance.get as jest.Mock).mockRejectedValueOnce({
            status: 404,
            data: []
        })
        const data = await getweatherdetails("India")
        expect(axiosInstance.get).toHaveBeenCalledWith("http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=India")
        expect(data).toEqual(null)
    })
})