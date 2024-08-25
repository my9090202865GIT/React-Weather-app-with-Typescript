import { act, fireEvent, screen } from '@testing-library/react';
import { Weather } from '../components/WeatherApp/Weather';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from '../utils/testUtils';
import { RecoilRoot } from 'recoil';
import { countryMockData } from '../mock/countryMockData';
import { weatherMockData } from '../mock/weatherMockData';
// import { getcountrydata, getweatherdetails } from '../utils/weatherApi.helpers';
// import axiosInstance from '../utils/https';
function hasInputValue(
    e: Document | Element | Window | Node,
    inputValue: string
) {
    return screen.getByDisplayValue(inputValue) === e;
}
const getcountryMockdata = jest.fn().mockImplementation(() =>
    Promise.resolve({ data: countryMockData })
);
jest.mock("../utils/localStorage", () => ({
    getFromStorage: jest.fn(),
    saveToStorage: jest.fn(),
}))
jest.mock("../utils/weatherApi.helpers", () => ({
    getcountrydata: jest.fn(),
    getweatherdetails: jest.fn()
}))
describe('Test Weather Componet', () => {
    test('should render Weather component with path "/"', async () => {
        toBeExpectByText('Submit');
        expect(screen.getByTestId('submit-button-testid')).toBeDisabled
        expect(screen.getByTestId('clear-button-testid')).toBeDisabled
        toBeExpectByTestId('inputbox-test-id');
    });

    test('should render button while text is entered in input box', () => {
        const input = screen.getByTestId('inputbox-test-id')
        fireEvent.change(input, { target: { value: 'USA' } })
        expect(hasInputValue(input, 'USA')).toBe(true);
        expect(screen.getByTestId('submit-button-testid')).toBeEnabled
    });

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks()
        componentRenderByMemoryRouter('/', <RecoilRoot><Weather />
        </RecoilRoot>);
    });

    test("rendering weather component while localstorage is set with country and weather data", () => {
        expect(screen.queryByText("Country Details")).not.toBeInTheDocument();
        const { getFromStorage } = require("../utils/localStorage");
         getFromStorage.mockReturnValue(countryMockData)
         getFromStorage.mockReturnValue(weatherMockData)
        expect(getFromStorage).toHaveBeenCalledTimes(2)
        componentRenderByMemoryRouter('/', <RecoilRoot><Weather />
        </RecoilRoot>);
        expect(screen.getByText("Country Details")).toBeInTheDocument();
        // expect(screen.getByTestId("country-info").firstChild?.textContent).toBeInTheDocument("Capital: Delhi");
    })
    // test("checking api call in weather component",async () => {
    //     const { getcountrydata, getweatherdetails } = require("../utils/weatherApi.helpers");
    //     getcountrydata.mockReturnValue(countryMockData);
    //     getweatherdetails.mockReturnValue(weatherMockData);
    //     componentRenderByMemoryRouter('/', <RecoilRoot><Weather />
    //     </RecoilRoot>);
    //     const input = screen.getByTestId('inputbox-test-id');
    //     fireEvent.change(input, { target: { value: 'USA' } });
    //     const submitBtn = screen.getByTestId("submit-button-testid");
    //     fireEvent.click(submitBtn);
    //     expect(axiosInstance.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/USA');

    // })
});
