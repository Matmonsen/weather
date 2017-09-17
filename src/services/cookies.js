import {CookiePath} from '../config';
/**
 * Retruns the value of a specific cookie or null
 * @param cname
 * @returns {*}
 */
export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

/**
 * Sets the value of a cookie
 * @param name Name of cookie
 * @param value Value of cookie
 * @param days Number of days to the cookie expires
 */
export function setCookie(name, value, days = 365) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=" + CookiePath;
}