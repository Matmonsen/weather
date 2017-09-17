import moment from 'moment';
import {WeekDays} from "../i18n";



/**
 * Sorts an array by weekdays
 * @param array Unsorted array of objects where one key is the weekday
 * @param locale The current locale
 * @returns {*}
 */
let sortByWeekdays = function(array, locale) {
    let result = [];

    let week = WeekDays[locale];
    if (week === null)
        return array;

    for(let day of week) {
        for (let elm of array) {
            if (elm.weekday === day) {
                result.push(elm);
            }
        }
    }
    return result;

};

/**
 * Comparer for soroting a list of dates
 * @param left
 * @param right
 * @returns {number}
 */
let sortByDate = function (left, right) {
    return moment.utc(left.start).diff(moment.utc(right.start))
};

export {sortByWeekdays,sortByDate};