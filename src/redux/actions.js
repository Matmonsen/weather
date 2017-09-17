import {Language, Settings} from "./actionTypes";

export function setFooterVisibliity(filter) {
    return {type: filter}
}

export function switchLanguage(lang) {
    return {
        type: Language.SWITCH,
        language: lang
    }
}


export function updateSettingLocation(settings) {
    return {
        type: Settings.UPDATE_LOCATION,
        payload: settings
    }
}

export function updateSettingPrefix(settings) {
    return {
        type: Settings.UPDATE_PREFIX,
        payload: settings
    }
}

export function updateSettingsGeneral(settings) {
    return {
        type: Settings.UPDATE_GENERAL,
        payload: settings
    }
}