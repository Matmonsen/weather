import {Search} from "../actionTypes";

export function updateErrorMessage(message = "") {
    return {
        type: Search.SET_ERRORMESSAGE,
        payload: message
    }
}


export function clearErrorMessage() {
    return {
        type: Search.SET_ERRORMESSAGE,
        payload: ""
    }
}

export function updateSearchQuery(query = "") {
    return {
        type: Search.SET_SEARCHQUREY,
        payload: query
    }
}