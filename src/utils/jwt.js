const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    /**
     * signAccessToken
     * @param {*} userId
     * @returns
     */

    signAccessToken: (userId, subject) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "2d",
                issuer: "vegroute.com",
                audience: userId,
                subject: subject
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    // console.log("Access Token Error" +err);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    /**
     * getTokenAudienceInfo
     * @param {*} token
     */

    getTokenAudienceInfo: (token) => {
        return new Promise((resolve, reject) => {
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
                    reject(createError.Unauthorized(message));
                }
                resolve(payload.aud);
            });
        });
    },

    /**
     * signRefreshToken
     * @param {*} userId 
     * @returns 
     */
    signRefreshToken: (userId, subject) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "30d",
                issuer: "vegroute.com",
                audience: userId,
                subject: subject
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    // console.log("Refresh Token Error" +err);

                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    /**
     * verifyRefreshToken
     * @param {*} refreshToken 
     * @returns 
     */
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
          JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if(err) return reject(createError.Unauthorized());
            
            const userId = payload.aud;
            
            resolve({"userId": userId, "userType": payload.sub});
          });
        });
      }
};
