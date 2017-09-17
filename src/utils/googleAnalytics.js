import * as ReactGA from "react-ga";

export function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

export const GoogleAnalyticsEventKeys = {
    SearchQuery: 'SearchQuery',
    SavedLocation: 'SavedLocation',
    SearchingError: 'SearchingError'
};

export const GoogleAnalyticsCategories = {
    Location: 'Location',
    Error: 'Error'
};

export const GoogleAnalyticsEvents = {
    SearchQuery: {
        category: GoogleAnalyticsCategories.Location,
        action: 'Searching for',
    },
    SavedLocation: {
        category: GoogleAnalyticsCategories.Location,
        action: 'Saved location on initialization',
    },
    SearchingError: {
        category: GoogleAnalyticsCategories.Error,
        action: 'Error when Search',
    },
};

/**
 * Reports a new googleAnalytics event
 * @param eventKey Which type of category and action
 * @param label
 * @param value
 * @param nonInteraction
 * @param transport
 */
export function reportGoogleAnalyticsEvent(eventKey, label = null, value = null, nonInteraction = null, transport = null) {
    let event = {
        category: GoogleAnalyticsEvents[eventKey].category,
        action: GoogleAnalyticsEvents[eventKey].action
    };

    if (label !== null)
        event['label'] = label;

    if (value !== null)
        event['value'] = value;

    if (nonInteraction !== null)
        event['nonInteraction'] = nonInteraction;

    if (transport !== null)
        event['transport'] = transport;

    ReactGA.event(event);
}
