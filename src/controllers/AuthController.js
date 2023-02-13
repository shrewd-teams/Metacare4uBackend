const {
	User,
	Specialist,
	Therapist,
	Appointment,
  Subscription,
  SlatDate
} = require("@models");

const nodemailer = require("nodemailer");
const {
	sendOtpSchema,
	verifyOtpSchema,
	createProfileSchema
} = require("@validation-schemas/AuthSchema");
const {
	OTP
} = require("@models");
const {
	successResponse,
	errorResponse,
	AppointmentId_generator
} = require("@utils/helper");
const {
	sendSMS
} = require("@utils/sendSMS");
const createError = require("http-errors");
const {
	signAccessToken,
	signRefreshToken
} = require("@utils/jwt");

const {
	currentDateTime,
	minuteDifference,
	addMinutes,
	remainingMinutes,
	convertToMilleSeconds,
	convertDateFormat,
	currentDate,
	addDays,
} = require("@utils/date_time_helper");
const {
	UserToken
} = require("@models");

// ENDINITIALIZATIONS



const getSpecialist = async (req, res, next) => {

try {
    const data = await Specialist.findAll();

    return res.send({ status: 200, data });
	
  } catch (error) {
    return res.send({ status: 404, data: error.message });
  }


}

const getTherapists = async (req, res, next) => {

try {
    const data = await Therapist.findAll();

    return res.send({ status: 200, data });
	
  } catch (error) {
    return res.send({ status: 404, data: error.message });
  }


}


const bookAppointment = async (req, res, next) => {
try{

     const appid=await AppointmentId_generator();

	var responseMessage = "Data Hasbeen Stored Successfully";
	var responseMessageError = "Something Went Wrong";

	const dataInsert = await Appointment.create({
		    appointment_id: appid,
            user_id: req.body.user_id,
            therapist_id: req.body.therapist_id,
            appointment_date: req.body.appointment_date,
            appointment_time: req.body.appointment_time,
            appointment_session: req.body.appointment_session,
            appointment_mode: req.body.appointment_mode,
            appointment_status:req.body.appointment_status,
	});
   const data={
	status:true,
	message:'success',
	appid:appid,
	data:req.body
   }
   if(dataInsert)
   {
    res.status(200).json(data);
   }
   else{
   res.status(422).json(errorResponse(responseMessageError));
   }
}
catch (error) {
		if (error.isJoi == true) error.status = 422;
		next(error);
	}
}

const LoginProcess = async (req, res, next) => {

try {

	let email_id=req.body.email_id;
	let password=req.body.password;
	let user_type=req.body.user_type;

	if(user_type==="Patient")
	{

	const CheckAuth = await User.findOne({
            where: { email_id: email_id, password: password},
        });

		if (CheckAuth) {

			return res.send({success:true, status: 200, message:"login Success",data: CheckAuth});
		}
		else
		{
        return res.send({success:false, status: 403, message:"Invalide Account Details",data:{}});
		}
	}
	//For therapist Login
	else
	{

		const CheckAuthTherapist = await Therapist.findOne({
            where: { email: email_id, password: password},
        });

		if (CheckAuthTherapist) {

			return res.send({success:true, status: 200, message:"login Success",data: CheckAuthTherapist});
		}
		else
		{
        return res.send({success:false, status: 403, message:"Invalide Account Details",data:{}});
		}

	}
  } catch (error) {
    return res.send({ status: 404, data: error.message });
  }


}



const UserRegisterProcess = async (req, res, next) => {

try {

	let first_name=req.body.first_name;
	let last_name=req.body.last_name;
	let mobile_number=req.body.mobile_number;
	let email_id=req.body.email_id;
	let password=req.body.password;


	const CheckDuplicate = await User.findOne({
            where: { email_id: email_id},
        });

		if (CheckDuplicate) {

			return res.send({success:false, status: 200, message:"Email Already Exists",data: CheckDuplicate});
		}
		else
		{
        	const dataInsert = await User.create({
		    first_name: first_name,
            last_name: last_name,
            mobile_number:mobile_number,
            email_id: email_id,
            password: password,
	});
	if(dataInsert)
	{

		const getData = await User.findOne({
            where: { email_id: email_id},
        });

		return res.send({success:true, status: 200, message:"Register Success",data: getData});
	}
		}
	}

   catch (error) {
    return res.send({ status: 404, message:error.message,data: error });
  }


}




const GoogleUserRegisterProcess = async (req, res, next) => {

try {

	let first_name=req.body.first_name;
	let email_id=req.body.email_id;


	const CheckDuplicate = await User.findOne({
            where: { email_id: email_id},
        });

		if (CheckDuplicate) {

			return res.send({success:true, status: 200, message:"Email Already Exists",data: CheckDuplicate});
		}
		else
		{
        	const dataInsert = await User.create({
		    first_name: first_name,
            email_id: email_id,
           

	});
	if(dataInsert)
	{

		const getData = await User.findOne({
            where: { email_id: email_id},
        });

		return res.send({success:true, status: 200, message:"Register Success",data: getData});
	}
		}
	}

   catch (error) {
    return res.send({ status: 404, message:error.message,data: error });
  }


}




const CheckValideMail = async (req, res, next) => {

try {
	   let email_id=req.body.email_id;
       let user_option=req.body.user_type;
	   console.log(user_option)
	   if(user_option==="Patient")
	   {
		let CheckDuplicate = await User.findOne({
            where: { email_id: email_id},
        });

		if(!CheckDuplicate) {

           

			return res.send({success:false, status: 200, message:"This Email Not Registered So please Register First."});
		}
		else
		{
			const otpFunc=await createandshareOtp(email_id);
			return res.send({success:true, status: 200, message:"Email Verification Code Sended Provide Mail address"});
		}
	}

	//For Docter Forgot password
	else
	{
	let CheckDuplicate = await Therapist.findOne({
            where: { email: email_id},
        });

		if(!CheckDuplicate) {

			return res.send({success:false, status: 200, message:"This Email Not Registered So please Register First."});
		}
		else
		{
			const otpFunc=await createandshareOtp(email_id);
			return res.send({success:true, status: 200, message:"Email Verification Code Sended Provide Mail address"});
		}
	}
}
 catch (error) {
    return res.send({ status: 404, message:error.message,data: error });
  }
}




const createandshareOtp = async (email_id)=>{

	                        console.log("entered");

                              var today = new Date();
                              var dd = today.getDate();
                              var mm = today.getMonth()+1; 
                              var yyyy = today.getFullYear();

                                if(dd<10) {dd="0"+dd } 

                                if(mm<10) { mm="0"+mm } 

                                today = yyyy+"-"+ mm+"-"+dd + " " +today.getHours() + ":" + today.getMinutes()+":" + today.getSeconds();
                  
                               const user_email=email_id;
                 //To Generate 6 Digit Otp
                 
                  const otp=Math.floor(100000 + Math.random() * 900000);  


					 	const checkDuplicate = await OTP.findOne({
                               where: { user_email: user_email},
                            });
							
                         //Duplicate Founded Update on existing
                         if(checkDuplicate)
                         {
								let dataInsert = await OTP.update({
							 otp:otp,
							 date_time:today
							},{
                               where: { user_email: user_email},
                            },)

							 let mailsend= await mailingFunction(otp,user_email);
					        return true;
                        
                         }//OtherWise Insert
                         else
                         {

							let dataInsert = await OTP.create({
		                     user_email: user_email,
							 otp:otp,
							 date_time:today
							})

							 let mailsend= await mailingFunction(otp,user_email)
                             return true;

                         }
                        

}

async function mailingFunction(otp,to)
{
  var otp=otp;
 var from = 'shrewdbs001@gmail.com';
                var to = to;
                
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'shrewdbs001@gmail.com',
                    pass: 'twoiinnbyuqhlhou'
                  }
                })
                
                var mailOptions = {
                  from: from,
                  to:to,
                  subject:"Message From MetaCare4u",
                  html:'<html lang="en-US">'+

  '<head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Reset Password Email Template</title>'+
    '<meta name="description" content="Reset Password Email Template."><style type="text/css">a:hover {text-decoration: underline !important;}</style></head>'+

'<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">'+
   
    '<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open Sans", sans-serif;">'+
        '<tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'+
                    '<tr><td style="height:80px;">&nbsp;</td>'+
                    '</tr><tr><td style="text-align:center;">'+
                          '<a href="#" title="logo" target="_blank"><img width="60" src="https://cdn-icons-png.flaticon.com/512/6195/6195700.png" title="logo" alt="logo"></a></td></tr>'+
                            
                        
                    '<tr><td style="height:20px;">&nbsp;</td> </tr>'+
                    '<tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr>'+
                     '<td style="height:40px;">&nbsp;</td></tr><tr><td style="padding:0 35px;">'+
                     '<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">You have requested to reset your password</h1>'+ '<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;">'+otp+' is the OTP For Your Reset password ,Valid For 15mins.Please Do not share this with anyone. </p>'+
                                        '</td>'+
                                '</tr><tr><td style="height:40px;">&nbsp;</td></tr></table></td>'+
                    '<tr><td style="height:20px;">&nbsp;</td></tr>'+
                    '<tr> <td style="height:80px;">&nbsp;</td> </tr>'+
                '</table></td></tr> </table>'+'</body></html>'
                }
                
                const checkStatus=await transporter.sendMail(mailOptions, function(error, info){
        
                   return true;
                })
}


const otpVerification = async (req, res, next) => {

    var user_email = req.body.user_email;
    var otp = req.body.otp;

       var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth()+1; 
       var yyyy = today.getFullYear();

       if(dd<10) {dd="0"+dd } 
       if(mm<10) { mm="0"+mm } 
       today = yyyy+"-"+ mm+"-"+dd + " " +today.getHours() + ":" + today.getMinutes()+":" + today.getSeconds();
                  
var otp_valide = await OTP.findOne({
                               where: { user_email: user_email,otp:otp}
                            });


        if(otp_valide)
        {

          let inserted_date = otp_valide.dataValues.date_time;

        // for (let key in otp_valide){

        //   inserted_date = otp_valide[key].date_time;
		  
        //  }
  console.log(inserted_date)
     
    //    var dd = inserted_date.getDate();
    //      var mm = inserted_date.getMonth()+1; 
    //        var yyyy = inserted_date.getFullYear();
    //           if(dd<10) {dd="0"+dd } 
    //               if(mm<10) { mm="0"+mm } 
    //                  inserted_date = yyyy+"-"+ mm+"-"+dd + " " +inserted_date.getHours() + ":" + inserted_date.getMinutes()+":" + inserted_date.getSeconds();
                  

    const timedif=getMinDiff(
    new Date(inserted_date),
    new Date(today))
   console.log(timedif)
    if(timedif <= 15 )
    {
        
        	let dataInsert = await OTP.destroy({
                               where: { user_email: user_email},
                            },)
        
        
      res.send({
       status: "success",
        statusCode: 200,
        redirect:true,
         msg:"OTP Valide "
             });
    }
    else{
        res.send({
       status: "success",
        statusCode: 200,
        redirect:false,
         msg:"OTP Expired"
             });
    }

    
        }
        else{
 res.send({
    status: "success",
    statusCode: 200,
    redirect:false,
    msg:"OTP Invalide "
                 });
        }
};


 function getMinDiff(startDate, endDate) {
  const msInMinute = 60 * 1000;

  return Math.round(
    Math.abs(endDate - startDate) / msInMinute
  );
  
}



const passwordUpdate = async (req, res, next) => {

try {
	   let email_id=req.body.email_id;
	   let password=req.body.password;
       let user_option=req.body.user_type;
	   if(user_option==="Patient")
	   {
		let CheckDuplicate = await User.update({password:password},{
            where: { email_id: email_id},
        });

		if(CheckDuplicate) {
			return res.send({success:true, status: 200, message:"Password Updated"});
		}
		else
		{
			return res.send({success:true, status: 200, message:"Somthing Went Wrong Password Not Updated"});
		}
	}
	//For Docter Forgot password
	else
	{

		let CheckDuplicate = await Therapist.update({password:password},{
            where: { email: email_id},
        });

		if(CheckDuplicate) {
			return res.send({success:true, status: 200, message:"Password Updated"});
		}
		else
		{
			return res.send({success:true, status: 200, message:"Somthing Went Wrong Password Not Updated"});
		}

	}
}
 catch (error) {
    return res.send({ status: 404, message:error.message,data: error });
  }
}

const SubscriptionPack = async (req, res, next) => {

try {
    const data = await Subscription.findAll();

    return res.send({ status: 200, data });
	
  } catch (error) {
    return res.send({ status: 404, data: error.message });
  }


}


const AddSlats = async (req, res, next)=>{
  try {

    let dateArray=req.body.dateArray;
    let slatArray=req.body.slatArray;

    dateArray = await dateArray.map(x => {
       return({date: x.slice(0, 10),therapist_id:1});
                         }); 
SlatDate.bulkCreate(dateArray,{returning: true})
.then(function() {
 //(if you try to immediately return the Model after bulkCreate, the ids may all show up as 'null')
  return SlatDate.findAll()
})
.then(function(response){
    res.json(response);
})
.catch(function(error){
    res.json(error);
})
  
    //   if (CheckDuplicate) {
  
    //     return res.send({success:false, status: 200, message:"Email Already Exists",data: CheckDuplicate});
    //   }
    //   else
    //   {
    //         const dataInsert = await User.create({
    //       first_name: first_name,
    //           last_name: last_name,
    //           mobile_number:mobile_number,
    //           email_id: email_id,
    //           password: password,
    // });
    // if(dataInsert)
    // {
  
    //   const getData = await User.findOne({
    //           where: { email_id: email_id},
    //       });
  
    //   return res.send({success:true, status: 200, message:"Register Success",data: getData});
    // }
    //   }
    }
  
     catch (error) {
      return res.send({ status: 404, message:error.message,data: error });
    }
  
}


module.exports = {
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
	
};