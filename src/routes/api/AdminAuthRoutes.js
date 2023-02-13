const express = require("express");
const router = express.Router();
const imageUploader = require("@utils/imageUploader");
// CONTROLLER ASSIGNMENTS
const {createSpecialist,createTherapist ,getAppointments,createSubscription,getSubscription} = require("@controllers/AdminAuthController");
// END CONTROLLER ASSIGNMENTS
// ROUTES START
router.post("/create_specialist", imageUploader.upload.single("image"),createSpecialist);
router.post("/create_therapist",createTherapist);
router.post("/create_subscription",imageUploader.upload.single("image"),createSubscription);
router.get("/get_subscriptions",getSubscription);
router.get("/get_appointments",getAppointments);

// END ROUTES

module.exports = router;
