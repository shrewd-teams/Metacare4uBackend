const express = require("express");
const router = express.Router();
const imageUploader = require("@utils/imageUploader");
// CONTROLLER ASSIGNMENTS
const {
    getSpecialist,
    getTherapists,
    bookAppointment,
    LoginProcess,
    UserRegisterProcess,
    CheckValideMail,
    otpVerification,
    passwordUpdate,
    GoogleUserRegisterProcess,
    SubscriptionPack,
    AddSlats,
} = require("@controllers/AuthController");
// END CONTROLLER ASSIGNMENTS
// ROUTES START
router.get("/get_specialist",getSpecialist);
router.get("/get_therapists",getTherapists);
router.post("/book_appointment",bookAppointment);
router.post("/login",LoginProcess);
router.post("/register",UserRegisterProcess);
router.post("/google_register",GoogleUserRegisterProcess);
router.post("/check_valide_mail",CheckValideMail);
router.post("/otp_verification",otpVerification);
router.post("/update_password",passwordUpdate);
router.post("/subscription_packs",SubscriptionPack);
router.post("/add_slats",AddSlats);
// END ROUTES

module.exports = router;
