const sendOtp = {
    tags: ["User Authentication"],
    description: "Send otp to the requested mobile number",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        mobile_number: {
                            type: "string",
                            description: "User mobile number",
                            example: "7639242027",
                        },
                        country_code: {
                            type: "string",
                            description: "User country code",
                            example: "91",
                        },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: "Created",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "OTP has been send to your mobile number",
                            data: {
                                start_time: "2022-11-28 15:20:48",
                                end_time: "2022-11-28 15:23:48",
                                remaining_minute_and_seconds: "03:00",
                                remaining_millesconds: 1669573980000,
                            },
                        },
                    },
                },
            },
        },
        200: {
            description: "OK",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "OTP is already send to your mobile number",
                            data: {
                                start_time: "2022-11-28 15:20:48",
                                end_time: "2022-11-28 15:23:48",
                                remaining_minute_and_seconds: "02:42",
                                remaining_millesconds: 1669573962000,
                            },
                        },
                    },
                },
            },
        },
        422: {
            description: "Unprocessable Entity",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Mobile number is a required field",
                            },
                        },
                    },
                },
            },
        },
    },
};

const reSendOtp = {
    tags: ["User Authentication"],
    description: "Re-send otp to the requested mobile number",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        mobile_number: {
                            type: "string",
                            description: "User mobile number",
                            example: "7639242027",
                        },
                        country_code: {
                            type: "string",
                            description: "User country code",
                            example: "91",
                        },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: "Created",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "OTP has been send to your mobile number",
                            data: {
                                start_time: "2022-11-28 15:25:30",
                                end_time: "2022-11-28 15:28:30",
                                remaining_minute_and_seconds: "03:00",
                                remaining_millesconds: 1669573980000,
                            },
                        },
                    },
                },
            },
        },
        200: {
            description: "OK",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "OTP is already send to your mobile number",
                            data: {
                                start_time: "2022-11-28 15:20:48",
                                end_time: "2022-11-28 15:23:48",
                                remaining_minute_and_seconds: "00:05",
                                remaining_millesconds: 1669573805000,
                            },
                        },
                    },
                },
            },
        },
        422: {
            description: "Unprocessable Entity",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Mobile number is a required field",
                            },
                        },
                    },
                },
            },
        },
    },
};

const verifyOtp = {
    tags: ["User Authentication"],
    description: "Verify the user mobile number by OTP",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        mobile_number: {
                            type: "string",
                            description: "User mobile number",
                            example: "7639242027",
                        },
                        otp: {
                            type: "string",
                            description: "OTP",
                            example: "260691",
                        },
                    },
                },
            },
        },
    },
    responses: {
        409: {
            description: "Conflict",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Enter valid OTP / Your OTP has been expired!",
                            },
                        },
                    },
                },
            },
        },
        202: {
            description: "ACCEPTED",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "OTP is already send to your mobile number",
                            data: {
                                start_time: "2022-11-28 15:20:48",
                                end_time: "2022-11-28 15:23:48",
                                remaining_minute_and_seconds: "00:05",
                                remaining_millesconds: 1669573805000,
                            },
                        },
                    },
                },
            },
        },
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "OTP is verified",
                            data: {
                                accessToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MzA0NTMsImV4cCI6MTY2OTgwMzI1MywiYXVkIjoiJDJiJDEwJFpOUTguVHhaaEwyNnhkbm03djd6cS5wWEVkTUtyTjZWdTRtU2czdmtCS0taTzFjMy5PREh5IiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoidXNlciJ9.I_oUTrB2CPvU1SRncndw0Yr1mhn8brR4H6a49WN1G-M",
                                refreshToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MzA0NTMsImV4cCI6MTY3MjIyMjQ1MywiYXVkIjoiJDJiJDEwJFpOUTguVHhaaEwyNnhkbm03djd6cS5wWEVkTUtyTjZWdTRtU2czdmtCS0taTzFjMy5PREh5IiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoidXNlciJ9.oiRjTZfCF8vgm0SezB0xVzQBZAdDX7B0BrYfNK5kjm4",
                            },
                        },
                    },
                },
            },
        },
        422: {
            description: "Unprocessable Entity",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Mobile number is a required field",
                            },
                        },
                    },
                },
            },
        },
    },
};

const createProfile = {
    tags: ["User Authentication"],
    description: "Create a new user profile",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        first_name: {
                            type: "string",
                            description: "User first name",
                            example: "Nallabhagan"
                        },
                        last_name: {
                            type: "string",
                            description: "User last name",
                            example: "R"
                        },
                        email: {
                            type: "string",
                            description: "User Email id",
                            example: "nallapagan1997@gmail.com"
                        },
                        dob: {
                            type: "date",
                            description: "User Date of birth",
                            example: "1995-06-03"
                        },
                        alternate_mobile_number: {
                            type: "string",
                            description: "User alternate mobile number",
                            example: "7639242027",
                        },
                        mobile_number: {
                            type: "string",
                            description: "User mobile number",
                            example: "7639242027",
                        },
                        country_code: {
                            type: "string",
                            description: "User country code",
                            example: "91",
                        },
                        refercode: {
                            type: "string",
                            description: "User refrence code",
                            example: "919494",
                        },
                    },
                },
            },
        },
    },
    responses: {
        409: {
            description: "Conflict",

            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "error": {
                                "message": "User is already exist"
                            }
                        }
                    },
                },
            },
        },
        
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "User has been registeredd",
                            data: {
                                accessToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MzA0NTMsImV4cCI6MTY2OTgwMzI1MywiYXVkIjoiJDJiJDEwJFpOUTguVHhaaEwyNnhkbm03djd6cS5wWEVkTUtyTjZWdTRtU2czdmtCS0taTzFjMy5PREh5IiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoidXNlciJ9.I_oUTrB2CPvU1SRncndw0Yr1mhn8brR4H6a49WN1G-M",
                                refreshToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MzA0NTMsImV4cCI6MTY3MjIyMjQ1MywiYXVkIjoiJDJiJDEwJFpOUTguVHhaaEwyNnhkbm03djd6cS5wWEVkTUtyTjZWdTRtU2czdmtCS0taTzFjMy5PREh5IiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoidXNlciJ9.oiRjTZfCF8vgm0SezB0xVzQBZAdDX7B0BrYfNK5kjm4",
                            },
                        },
                    },
                },
            },
        },
        422: {
            description: "Unprocessable Entity",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Mobile number is a required field",
                            },
                        },
                    },
                },
            },
        },
    },
};

const userAuthenticationSwagger = {
    "/auth/send-otp": {
        post: sendOtp,
    },
    "/auth/resend-otp": {
        post: reSendOtp,
    },
    "/auth/verify-otp": {
        post: verifyOtp
    },
    "/auth/create-profile": {
        post: createProfile
    }
};

module.exports = userAuthenticationSwagger;
