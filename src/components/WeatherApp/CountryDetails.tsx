import React from 'react';
import { Button, Container, Alert } from '@mui/material';
import { countryState, countryApiError as countryDetailsApiError, weatherInfo as CountryweatherInfo } from '../../recoil/weatherRecoil';
import { useRecoilValue } from 'recoil';


export interface InitCountry {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        svg: string;
    };
}

export interface InitCountryWeatherInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}

export const CountryDetails: React.FC = () => {
    const weatherInfo = useRecoilValue(CountryweatherInfo);
    const countryInfo = useRecoilValue(countryState);
    const countryApiError = useRecoilValue<Boolean>(countryDetailsApiError);
   

    return (
        <Container maxWidth="md">
            <div>
                <h1>Country Details</h1>

                {countryInfo.population && !countryApiError ? (
                    <Container className='d-flex flex-wrap justify-content-evenly'>
                        <div data-testid="country-info">
                            <p>Capital: {countryInfo.capital[0]}</p>
                            <p>Population: {countryInfo.population}</p>
                            <p>
                                Latitude: {countryInfo.latlng[0]}
                                <sup>o</sup>
                            </p>
                            <p>
                                Longitude: {countryInfo.latlng[1]}
                                <sup>o</sup>
                            </p>
                            <small>Country Flag : </small>
                            <img src={countryInfo.flags.svg} height="70px" alt="" />

                        </div>
                        <div
                            className="weather-content"
                            data-testid="weather-details">
                            <h3>Weather Info</h3>
                            <img
                                src={weatherInfo.weather_icons[0]}
                                alt="Weather Icon"
                            />
                            <p>
                                Temperature: {weatherInfo.temperature}
                                <sup>o</sup>
                            </p>
                            <p>Wind Speed: {weatherInfo.wind_speed}</p>
                            <p>Precip: {weatherInfo.precip}</p>
                        </div>
                    </Container>

                ) : (
                    <div>
                        {' '}
                        {countryApiError ? (
                            <>
                                <Alert severity="warning" sx={{ m: 2 }}>
                                    Country info not found!
                                </Alert>
                             
                            </>
                        ) : (
                            'Loading...'
                        )}
                    </div>
                )}

                {/* {weatherInfo ? (
                    <div
                        className="weather-content"
                        data-testid="weather-details">
                        <br />
                        <h3>Weather Info</h3>
                        <br />
                        <img
                            src={weatherInfo.weather_icons[0]}
                            alt="Weather Icon"
                        />
                        <p>
                            Temperature: {weatherInfo.temperature}
                            <sup>o</sup>
                        </p>
                        <p>Wind Speed: {weatherInfo.wind_speed}</p>
                        <p>Precip: {weatherInfo.precip}</p>
                    </div>
                ) : (
                    <div>
                        {weatherApiError ? (
                            <Alert severity="warning">
                                Weather info not found. Please try again!
                            </Alert>
                        ) : (
                            // <p>{loading ? 'Loading...' : ''}</p>
                            <p>{false ? 'Loading...' : ''}</p>
                        )}
                    </div>
                )} */}
            </div>
        </Container>
    );
};
