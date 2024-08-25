import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { CountryDetails } from './CountryDetails';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { countryApiError, weatherInfo, countryState, countryStateWithLocalStorage,weatherInfoWithLocalStorage } from '../../recoil/weatherRecoil';
import { getcountrydata, getweatherdetails } from '../../utils/weatherApi.helpers';
import { weatherMockData } from '../../mock/weatherMockData';
import { Link } from 'react-router-dom';
import { removeFromStorage, getFromStorage } from '../../utils/localStorage';

export const Weather: React.FC = () => {
    const [countryName, setCountryName] = useState('');
    const [showCountryDetails, setShowCountryDetails] = useState(false);
    const [CountryDeatilsWithLocalStorage, setCountryDeatilsWithLocalStorage] = useRecoilState(countryStateWithLocalStorage);
    const [WeatherDeatilsWithLocalStorage, setWeatherDeatilsWithLocalStorage] = useRecoilState(weatherInfoWithLocalStorage);
    const [CountryDeatilsCountryState, setCountryDeatilsCountryState] = useRecoilState(countryState);
    // const initialCountry = useRecoilValue(countryStateWithLocalStorage);
    const resetCountryState = useResetRecoilState(countryStateWithLocalStorage);
    const resetWeatherState = useResetRecoilState(weatherInfoWithLocalStorage);

    // const [WeatherDeatils, setWeatherDeatils] = useRecoilState(weatherInfo);
    const [apiError, setApiError] = useRecoilState<boolean>(countryApiError)


    React.useEffect(() => {
        const savedCountryData = getFromStorage("countryData")
        const savedWeatherData = getFromStorage("weatherData")
        // console.log(initialCountry)
        if (savedCountryData && savedWeatherData) {
            setCountryDeatilsCountryState(savedCountryData)
            setWeatherDeatilsWithLocalStorage(savedWeatherData)
            // setWeatherDeatilsWithLocalStorage(weatherMockData)
            setShowCountryDetails(true)
        }
    }, [])
    const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const innerText = event.currentTarget.innerText;

        if (innerText === "SUBMIT") {
            setShowCountryDetails(true)
            const data = await getcountrydata(countryName)
            if (data) {
                // const weatherData = await getweatherdetails(data[0].capital[0])
                // if (weatherData) {
                //     setWeatherDeatilsWithLocalStorage(weatherData)
                // }else{
                //     // setWeatherDeatilsWithLocalStorage(weatherMockData)
                // }
                setCountryDeatilsWithLocalStorage(data);
                setWeatherDeatilsWithLocalStorage(weatherMockData)
                apiError && setApiError(false)
            } else {
                setApiError(true);
                resetCountryState();
                resetWeatherState();
            }
        } else {
            setShowCountryDetails(false);
            removeFromStorage("countryData");
            resetCountryState();
            resetWeatherState();
        }
    };
    return (
        <Container maxWidth="md">
            <Button
                size="medium"
                variant="text"
            >
                <Link to={"/todo"}>Goto todo</Link>
            </Button>
            <div className="my-3">
                <h1 className="text-center">Weather App</h1>
                <TextField
                    id="outlined-basic"
                    fullWidth
                    value={countryName}
                    label="Enter country Name"
                    variant="outlined"
                    inputProps={{ "data-testid": "inputbox-test-id" }}
                    onChange={(e) => setCountryName(e.target.value)}
                />
            </div>
            <Button size="medium" variant="contained" data-testid="submit-button-testid" disabled={countryName === ''} onClick={submit}>
                Submit
            </Button>
            <Button size="medium" sx={{ marginInlineStart: 1 }} variant="contained" data-testid="clear-button-testid" disabled={countryName === '' && !showCountryDetails} onClick={submit}>
                Clear
            </Button>
            {showCountryDetails && <CountryDetails />}
        </Container>
    );
};
