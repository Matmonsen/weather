import {Theme} from './theme';

export const Languages = {
    ENGLISH: "en",
    NORSK: "nb",
    NYNORSK: "nn"
};

export const ForecastTypes = {
    WEEK: "standard",
    HOURLY: "hourly"

};

// Per 10 sec
export const CheckForCacheReload = 10000;

export const GoogleAnalyticsKey = "UA-89606241-1";

const base = "https://weatherapi.sindrenerdal.no/";
const apiBase = `${base}api/`;

const endpoints = {
    SEARCH: `${apiBase}search/`,
};

export const CookiePath = "/";


export const Api = {
    SEARCH: endpoints["SEARCH"]
};


export const Cookies = {
    ACCEPT: 'accept-cookie'
};

export const SourceCodeAPI = "https://github.com/Matmonsen/weather_api";
export const SourceCodeAPP = "https://github.com/Matmonsen/weather";
export const SourceCodeWEBFONT = "https://github.com/Matmonsen/yr-icons";
export const MainSite = "https://sindrenerdal.no";

export default Theme;
