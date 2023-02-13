const getToken = {
    tags: ["Token Authentication"],
    description: "Get Access token & Refresh token for guest user",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "Guest token has been issued!",
                            data: {
                                accessToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MTkwMDIsImV4cCI6MTY2OTc5MTgwMiwiYXVkIjoiJDJiJDEwJGxrdkguM3JVNjFQNkhpNGIuSEtra084bEU2aE1SSUUvb0NXdkVubEtBa0NELkp4dlBYSXBlIiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoiZ3Vlc3QifQ.Gl1nlfx5cFKhRqWCK1cCapvDhQ1ns0v30EX1-We-gxo",
                                refreshToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MTkwMDIsImV4cCI6MTY3MjIxMTAwMiwiYXVkIjoiJDJiJDEwJGxrdkguM3JVNjFQNkhpNGIuSEtra084bEU2aE1SSUUvb0NXdkVubEtBa0NELkp4dlBYSXBlIiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoiZ3Vlc3QifQ.Uz6KMKJJtULfXCFYhOh8EdJuDxSzViW4B4QO94Ehn0Y",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Internal Server Error",
                            },
                        },
                    },
                },
            },
        },
    },
};

const refreshToken = {
    tags: ["Token Authentication"],
    description: "To refresh the access token, if its expired",
    requestBody: {
        content: {
            
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        refreshToken: {
                            type: "string",
                            description: "JWT Refresh token",
                            example:
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2MTkwMDIsImV4cCI6MTY3MjIxMTAwMiwiYXVkIjoiJDJiJDEwJGxrdkguM3JVNjFQNkhpNGIuSEtra084bEU2aE1SSUUvb0NXdkVubEtBa0NELkp4dlBYSXBlIiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoiZ3Vlc3QifQ.Uz6KMKJJtULfXCFYhOh8EdJuDxSzViW4B4QO94Ehn0Y",
                        },
                    },
                },
            },
            
        },
    },
    responses: {
        200: {
            description: "OK",
            
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: true,
                            message: "Guest token has been re-issued!",
                            data: {
                                accessToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk0NDczMTAsImV4cCI6MTY2OTQ0NzM3MCwiYXVkIjoiJDJiJDEwJGhFd2c4YzRWU2hua0MvWi9zb2M2cnVKdDlLY3dZa3VWTnMvTkZuSmkxdktqSFVETlJFS1FLIiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoiZ3Vlc3QifQ.Rmbw8tmXUGXqnGU1X8rlGzJc77auFXJgBf9y0zuN52U",
                                refreshToken:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk0NDczMTAsImV4cCI6MTY2OTQ0NzQ5MCwiYXVkIjoiJDJiJDEwJGhFd2c4YzRWU2hua0MvWi9zb2M2cnVKdDlLY3dZa3VWTnMvTkZuSmkxdktqSFVETlJFS1FLIiwiaXNzIjoidmVncm91dGUuY29tIiwic3ViIjoiZ3Vlc3QifQ.P0nLgELKcTF896oM4bRabW7-ZHA5Y1jgDfn-fsUWW2A",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            error: {
                                message: "Internal Server Error",
                            },
                        },
                    },
                },
            },
        },
        401: {
            description: "If Refresh token is invalid!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "error": {
                                "message": "Unauthorized"
                            }
                        }
                    },
                },
            },
        },
    },
};
const authenticationSwagger = {
    "/get-token": {
        get: getToken,
    },
    "/refresh-token": {
        post: refreshToken,
    },
};

module.exports = authenticationSwagger;
