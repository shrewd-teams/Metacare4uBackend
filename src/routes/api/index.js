const express = require("express");
const { verifyAccessToken } = require("@middlewares/JwtVerification");
const router = express.Router();
const { signAccessToken, getTokenAudienceInfo, signRefreshToken } = require("@utils/jwt");
const { getBearerToken } = require("@utils/helper");
const { successResponse, errorResponse } = require("@utils/helper");

// CONTROLLER ASSIGNMENTS
const { generateGuestToken, refreshToken } = require("@controllers/JwtTokenController");
// END CONTROLLER ASSIGNMENTS
// APPLICATION ROUTES
const AuthRoutes = require("./AuthRoutes");
const AdminAuthRoutes = require("./AdminAuthRoutes");
// END APPLICATION ROUTES

router.get("/", verifyAccessToken, async (req, res) => {
    res.send("WELCOME TO Meta Care APP");
});
router.get("/get-token", generateGuestToken);
router.post("/refresh-token", refreshToken);
router.use("/auth", AuthRoutes);
router.use("/admin/auth", AdminAuthRoutes);


module.exports = router;
