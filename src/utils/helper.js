var rn = require("random-number");
const bcrypt = require("bcrypt");

/**
 * generateOtp
 * @returns six digit number
 */

function generateOtp() {
    return randomNumber(100000, 999999);
}
function AppointmentId_generator() {
    let number = randomNumber(100000, 999999);
    let id="Metacare4u"+number;
    return id;
}
/**
 * randomNumber
 * @param {*} min
 * @param {*} max
 */
function randomNumber(min, max) {
    var options = {
        min: min,
        max: max,
        integer: true,
    };
    return rn(options);
}

/**
 * successResponse
 * @param {*} dataObject
 * @param {*} message
 * @returns success message json
 */
function successResponse(dataObject, message) {
    return { status: true, message: message, data: dataObject };
}

/**
 * errorResponse
 * @param {*} messageObject
 * @returns error message json
 */
function errorResponse(messageObject) {
    return {
        error: messageObject,
    };
}

/**
 * getBearerToken
 * @param {*} requestHeader
 * @returns
 */
async function getBearerToken(requestHeader) {
    const bearerToken = requestHeader.split(" ");
    const token = bearerToken[1];

    return await token;
}

/**
 * encryptData
 * @param {*} originalData 
 * @returns 
 */

function encryptData(originalData) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedData = bcrypt.hashSync(originalData.toString(), salt);
    return encryptedData;
}

/**
 * compareDecryptData
 * @param {*} original_data 
 * @param {*} encrypted_data 
 * @returns 
 */

async function compareDecryptData(original_data, encrypted_data) {
    return await bcrypt.compare(original_data.toString(), encrypted_data);
}
module.exports = {
    generateOtp,
    successResponse,
    errorResponse,
    getBearerToken,
    randomNumber,
    encryptData,
    compareDecryptData,
    AppointmentId_generator
};
