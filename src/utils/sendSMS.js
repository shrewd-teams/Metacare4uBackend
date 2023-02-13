const axios = require("axios");
const createError = require("http-errors");
module.exports = {
  /**
   * sendSMS
   * @param country_code
   * @param mobile_number
   * @param message
   * @returns
   */
  sendSMS: async (country_code, mobile_number, message) => {
    try {
      let res = await axios({
        url: "https://smartsms.nettyfish.com/api/v2/SendSMS",
        method: "POST",
        data: {
            SenderId: process.env.SMS_SENDER_ID,
            ApiKey: process.env.SMS_API_KEY,
            ClientId: process.env.SMS_CLIENT_ID,
            Message: message,
            MobileNumbers: mobile_number,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      /**
       * TODO: Error handling (API always return 200, if we make error)
       */

      return true;
    } catch (err) {
        /**
         * TODO: Error handling (API always return 200, if we make error)
         */
        
    }
  },
};
