const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create question by user id and category
 * @route post /private/question
 * @group question - Operations about question
 * @param {question.model} question.body - question.userId,question.category is required and unique, others are optional
 * @returns {question.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
const CreateQuestion = asyncHandler( async (req, res, next) => {
    let Question = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Question.userId,Question.category])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let result = await models.question.create(Question)
    
    // 3 return record
    return status200(res,result)
})

/**
 * get questions by user id
 * @route get /private/question/GetAll
 * @group question - Operations about question
 * @param {string} userId.query.required 
 * @param {integer} offset.query - optional, default 0
 * @param {integer} limit.query - optional, default max
 * @returns {Array.<question>} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const SearchByUserID = asyncHandler(async (req, res, next) => {

    let {userId,offset,limit} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_userId = NotNullCheck([userId])
    let Offset = offset || 0
    let Limit = limit || 10000

    if(!check_userId){
        return status400(res,'invalid params')
    }
    
    // 2 find charts
    let result = await models.question.findAll({ 
        where: {
            userId,
        }, 
        offset:parseInt(Offset),
        limit:parseInt(Limit),
    })
    
    // 3 return a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get question by question id 
 * @route get /private/question
 * @group question - Operations about question
 * @param {string} id.query.required 
 * @returns {question.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - question not existed
 * @security JWT
 */
 const GetQuestionByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find question by question id
    let result = await models.question.findOne({ 
        where: {id}, 
    })
    
    // 3 return result
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update question by question id 
 * @route put /private/question
 * @group question - Operations about question
 * @param {question.model} question.body - question.id, is required, others are optional
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - question not existed
 * @security JWT
 */
 const UpdateQuestionByID = asyncHandler(async (req, res, next) => {

    let Question = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Question.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.question.update(Question,{ 
        where: {
            id:Question.id
        }, 
    })
    // 3 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete question by question id 
 * @route delete /private/question
 * @group question - Operations about question
 * @param {string} id - favourite.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - question not existed
 * @security JWT
 */
 const DeleteQuestionByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.question.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateQuestion,
    SearchByUserID,GetQuestionByID,
    UpdateQuestionByID,
    DeleteQuestionByID,
};
