const { signAccessToken, getTokenAudienceInfo, signRefreshToken, verifyRefreshToken } = require("@utils/jwt");
const { successResponse, errorResponse, encryptData, compareDecryptData } = require("@utils/helper");
const { UserToken } = require("@models");
const createError = require("http-errors");
const { currentDateTime, addDays } = require("@utils/date_time_helper");
const { verifyRefreshTokenSchema } = require("@validation-schemas/AuthSchema");
/**
 * generateGuestToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * TODO: customized token generation code (need code optimization for token generation)
 */

const generateGuestToken = async (req, res, next) => {
    try {
        const lastGuestId = await UserToken.findOne({
            attributes: ["user_id"],
            where: { user_type: "guest" },
            order: [["user_id", "DESC"]],
        });

        if (!lastGuestId) {
            guestId = 1;
        } else {
            guestId = lastGuestId.user_id + 1;
        }
       
        const created_at = currentDateTime();
        const expired_at = addDays(created_at, 30);

        const encryptedGuestId = await encryptData(guestId);
        
        const accessToken = await signAccessToken(encryptedGuestId, "guest");
        
        const refreshToken = await signRefreshToken(encryptedGuestId, "guest");

        const saveToken = await UserToken.create({
            user_id: guestId,
            refresh_token: refreshToken,
            user_type: "guest",
            created_at: created_at,
            expired_at: expired_at,
        });

        
        if (!saveToken) throw createError.InternalServerError();
        res.json(successResponse({ accessToken, refreshToken }, "Guest token has been issued!"));
    } catch (error) {
        next(error);
    }
};

/**
 * refreshToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const refreshToken = async (req, res, next) => {
    try {
        const result = await verifyRefreshTokenSchema.validateAsync(req.body);

        const validateRefreshToken = await verifyRefreshToken(result.refreshToken);
        
        const encryptedUserId = validateRefreshToken.userId;
        const userType = validateRefreshToken.userType;
        const getTokenDetails = await UserToken.findOne({
            where: { user_type: userType, refresh_token: result.refreshToken },
        });

        if(!getTokenDetails) throw createError.Unauthorized();

        const match = await compareDecryptData(getTokenDetails.user_id, encryptedUserId);

        if (!match) throw createError.Unauthorized();

        const created_at = currentDateTime();
        const expired_at = addDays(created_at, 30);
        const encryptedGuestId = await encryptData(getTokenDetails.user_id);

        const accessToken = await signAccessToken(encryptedGuestId, "guest");
        const refreshToken = await signRefreshToken(encryptedGuestId, "guest");

        const updatedToken = await UserToken.update(
            {
                refresh_token: refreshToken,
                created_at: created_at,
                expired_at: expired_at,
            },
            {
                where: { user_id: getTokenDetails.user_id, user_type: userType },
            }
        );
        if (!updatedToken) throw createError.InternalServerError();
        res.json(successResponse({ accessToken, refreshToken }, "Guest token has been re-issued!"));
    } catch (error) {
        if (error.isJoi == true) error.status = 422;
        next(error);
    }
};
module.exports = {
    generateGuestToken,
    refreshToken,
};
