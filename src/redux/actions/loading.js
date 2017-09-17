import {Loading} from "../actionTypes";

export function startLoading(message) {
    return {
        type: Loading.START,
        payload: message
    }
}
export function stopLoading() {
    return {
        type: Loading.STOP,
        payload: ""
    }
}