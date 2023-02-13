const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { getBearerToken } = require("@utils/helper");

/**
 * verifyAccessToken
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyAccessToken = async (req, res, next) => {
    if(!req.headers['authorization']) return next(createError.Unauthorized())

    const token = await getBearerToken(req.headers['authorization']); // Get token through helper funtion

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message));
        }

        req.payload = payload;
        next()
    })
}

module.exports = {
    verifyAccessToken
}