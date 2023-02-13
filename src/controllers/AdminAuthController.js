const {
	Specialist,
	Therapist,
	Appointment,
	Subscription
} = require("@models");
const createError = require("http-errors");
/**
 * createSpecialist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const {
	VerifySpecialist
} = require("@validation-schemas/AuthSchema");

const {
	successResponse,
	errorResponse,
} = require("@utils/helper");


/**
 * createSpecialist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createSpecialist = async (req, res, next) => {


try {

    var responseMessage = "Data Hasbeen Stored Successfully";
    var statusCode = 200;


		const result = await VerifySpecialist.validateAsync(req.body);

			let title = req.body.title;
	      let image = req.file.filename;
	  const dataInsert = await Specialist.create({
		specialist_title: title,
		specialist_image: image
	});


        res.status(statusCode).json(successResponse(responseMessage));

    } catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}

}

/**
 * createTherapist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createTherapist = async (req, res, next) => {
try {

	console.log(req.body)
	let specialist_id = req.body.specialist_id;
	let first_name = req.body.first_name;
	let last_name = req.body.last_name;
	let email = req.body.email;
	let mobile = req.body.mobile;
	let clinic_name = req.body.clinic_name;
    let password = req.body.password;

	const dataInsert = await Therapist.create({
		    specialist_id: specialist_id,
            first_name: first_name,
            last_name:last_name,
            email: email,
            mobile: mobile,
            clinic_name: clinic_name,
			password:password,
	});
	  var responseMessage = "Data Hasbeen Stored Successfully";
    var statusCode = 200;
	
     res.status(statusCode).json(successResponse(responseMessage));
}
catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}




const createSubscription = async (req, res, next) => {

try {
	console.log("Im there subscription")
    var responseMessage = "Pack Created Successfully";
    var statusCode = 200;
	var ErrorCode =502;
	var errorResponseMessage="Internel Server Error";


	
	const dataInsert = await Subscription.create({
		    pack_name: req.body.packName,
			pack_image:req.file.filename,
            pack_rate: req.body.packRate,
            pack_validity:req.body.packValidity,
            video_call: req.body.packVideo,
            chat: req.body.packChat,	
	});
	if(dataInsert)
	{res.status(statusCode).json(successResponse(responseMessage));}
	else{
		res.status(ErrorCode).json(errorResponse(errorResponseMessage));
	}

    } catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}



}


const getSubscription = async (req, res, next) => {

try {
    const data = await Subscription.findAll();

    return res.send({ status: 200, data });
	
  } catch (error) {
    return res.send({ status: 404, data: error.message });
  }
}



const getAppointments = async (req, res, next) => {

try {
    const data = await Appointment.findAll();

    return res.send({ status: 200, data });
	
  } catch (error) {
    return res.send({ status: 404, data: error.message });
  }
}

module.exports = {
    createSpecialist,
    createTherapist,
	getAppointments,
	createSubscription,
	getSubscription
};