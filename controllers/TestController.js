const asyncHandler = require("../utils/asyncHandler")
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')
const authService = require('../service/authService')

const TestPublic = asyncHandler( async (req, res, next) => {
    return status200(res,'testPublic')
})
const TestPrivate = asyncHandler(async (req, res, next) => {
    return status200(res,'testPrivate')
})
const GetAuth = asyncHandler(async (req, res, next) => {
    let payload = 'test'
    const token = authService().issue({ payload });
    return status200(res,token)
})
module.exports = {
    TestPublic,
    TestPrivate,
    GetAuth,
};
