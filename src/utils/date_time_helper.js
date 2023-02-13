const moment = require("moment");

/**
 * currentDateTime
 * @returns timestamp
 */
function currentDateTime() {
    return moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
}

/**
 * currentDate
 * @returns date
 */
 function currentDate() {
    return moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
}

/**
 * minuteDifference
 * @param {*} dateTime
 */
function minuteDifference(dateTime) {
    const startDateTime = moment(currentDateTime(), "DD-MM-YYYY HH:mm:ss").tz("Asia/Kolkata");
    const endDateTime = moment(dateTime, "DD-MM-YYYY HH:mm:ss").tz("Asia/Kolkata");

    const minutesDifference = startDateTime.diff(endDateTime, "minutes");

    return minutesDifference;
}

/**
 * addMinutes
 * @param {*} dateTime
 * @param {*} noOfMinute
 */
function addMinutes(dateTime, noOfMinute) {
    return moment(dateTime, "YYYY-MM-DD HH:mm:ss").add(noOfMinute, "minutes").format("YYYY-MM-DD HH:mm:ss");
}

/**
 * addMonth
 * @param {*} dateTime 
 * @param {*} noOfMonth 
 * @returns 
 */
function addMonth(dateTime, noOfMonth) {
    return moment(dateTime, "YYYY-MM-DD HH:mm:ss").add(noOfMonth, "month").format("YYYY-MM-DD HH:mm:ss");
}

/**
 * addDays
 * @param {*} dateTime 
 * @param {*} noOfDays 
 * @returns 
 */
 function addDays(dateTime, noOfDays) {
    return moment(dateTime, "YYYY-MM-DD HH:mm:ss").add(noOfDays, "days").format("YYYY-MM-DD HH:mm:ss");
}


/**
 * remainingMinutes
 * @param {*} expiryDateTime
 */
function remainingMinutes(expiryDateTime) {
    var startDateTime = currentDateTime();
    const timeDifference = moment
        .utc(moment(expiryDateTime, "YYYY-MM-DD HH:mm:ss").diff(moment(startDateTime, "YYYY-MM-DD HH:mm:ss")))
        .format("mm:ss");
    return timeDifference;
}

/**
 * convertToMilleSeconds
 * @param {*} dateTime
 * @param {*} dateTimeFormat
 * @returns (int)
 */
function convertToMilleSeconds(dateTime, dateTimeFormat) {
    var milliseconds = moment(dateTime, dateTimeFormat).valueOf();
    return milliseconds;
}

/**
 * convertMilleToDateTime
 * @param {*} milleSeconds
 * @param {*} dateTimeFormat
 * @returns (dateTime)
 */

function convertMilleToDateTime(milleSeconds, dateTimeFormat) {
    const dateTime = moment(milleSeconds).tz("Asia/Kolkata").format(dateTimeFormat);
    return dateTime;
}

/**
 * convertDateFormat
 * @param {*} date 
 * @returns 
 */

function convertDateFormat(date) {
    const dateFormat = moment(date).tz("Asia/Kolkata").format('YYYY-MM-DD');
    return dateFormat;
}

/**
 * convertDateTimeFormat
 * @param {*} date 
 * @returns 
 */

function convertDateTimeFormat(date) {
    const dateTimeFormat = moment(date).tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
    return dateTimeFormat;
}
module.exports = {
    currentDateTime,
    minuteDifference,
    addMinutes,
    addMonth,
    remainingMinutes,
    addDays,
    convertToMilleSeconds,
    convertMilleToDateTime,
    convertDateFormat,
    currentDate,
    convertDateTimeFormat
};
