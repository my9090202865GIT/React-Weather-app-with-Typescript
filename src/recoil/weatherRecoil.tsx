import { atom, DefaultValue, selector } from "recoil";
import { InitCountry, InitCountryWeatherInfo } from "../components/WeatherApp/CountryDetails";
import { saveToStorage, getFromStorage, removeFromStorage } from "../utils/localStorage";
export const countryState = atom<InitCountry>({
  key: 'Country',
  default: {
    capital: [''],
    population: 0,
    latlng: [0, 0],
    flags: {
      svg: '',
    },
  },
});

export const countryApiError = atom<boolean>({
  key: "errorfetchingCountry",
  default: false
})

export const weatherInfo = atom<InitCountryWeatherInfo>({
  key: 'capitalWeather',
  default: {
    temperature: 0,
    weather_icons: [''],
    wind_speed: 0,
    precip: 0
  },
});
export const weatherInfoWithLocalStorage = selector<InitCountryWeatherInfo>({
  key: "weatherInfoWithLocalStorage",
  get: ({ get }) => {
    const savedWeatherInfo = getFromStorage("weatherData")
    if (savedWeatherInfo) {
      return savedWeatherInfo
    } else {
      return get(weatherInfo);
    }
  },
  set:({set},newValue)=>{
    if (!(newValue instanceof DefaultValue)) {
      saveToStorage('weatherData', newValue)
      set(weatherInfo, newValue);
    } else {
      removeFromStorage('weatherData')
    }
  }
})
export const countryStateWithLocalStorage = selector<InitCountry>({
  key: 'countryStateWithLocalStorage',
  get: ({ get }) => {
    const savedCountry = getFromStorage("countryData")
    if (savedCountry) {
      return savedCountry
    } else {
      return get(countryState);
    }
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      saveToStorage('countryData', newValue)
      set(countryState, newValue);
    } else {
      console.log("!(newValue instanceof DefaultValue)")
      removeFromStorage('countryData')
    }
  },
});