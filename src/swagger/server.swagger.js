const connectToServer = {
    tags: ["Server"],
    description: "Server Default Routes",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "string",
                        example: "WELCOME TO VEGROUTE APP",
                    },
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "jwt expired",
                            },
                        },
                    },
                },
            },
        },
    },
}

const notFound = {
    tags: ["Server"],
    description: "Server Default Routes",
    responses: {
        
        404: {
            description: "Not Found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "error": {
                                "message": "This route does not exist"
                            }
                        },
                    },
                },
            },
        },
    },
}

const serverSwagger = {
    "/": {
        get: connectToServer
    },
    "/some-random-url": {
        get: notFound
    }
};

module.exports = serverSwagger;