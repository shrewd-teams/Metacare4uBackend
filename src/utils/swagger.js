const serverSwagger = require("@swagger/server.swagger");
const authenticationSwagger = require("@swagger/authentication.swagger");
const userAuthenticationSwagger = require("@swagger/user.auth.swagger");
const env = process.env.SWAGGER_ENV;
const config = require(__dirname + "/../config/swaggerConfig.json")[env];


const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "VEGROUTE NODE APP",
        version: "1.0.0",
        description: "",
    },
    scheme: ["http", "https"],
    headers: {
        accept: "application/json",
    },
    servers: [
        config
    ],
    tags: [
        {
            name: "Token Authentication",
            description: "JWT Token routes",
        },
        {
            name: "Server",
            description: "Server Default Routes",
        },
        {
            name: "User Authentication",
            description: "User Login via OTP, Register user routes",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],

    paths: {
        ...serverSwagger,
        ...authenticationSwagger,
        ...userAuthenticationSwagger
    },
};

module.exports = swaggerDocumentation;
