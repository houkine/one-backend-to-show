const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create answer by user id and question id, now the rule is one user can answer one question only one time, can change to multiple
 * @route post /private/answer
 * @group answer - Operations about answer
 * @param {answer.model} answer.body - answer.userId,answer.questionId is required and unique, others are optional
 * @returns {answer.model} 200 - success
 * @returns {Error}  400 - invalid params / answer existed
 * @security JWT
 */
const CreateAnswer = asyncHandler( async (req, res, next) => {
    let Answer = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Answer.userId,Answer.questionId])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // 2 find or create answer by user id and question id
    let [result, created] = await models.answer.findOrCreate({ 
        where: {
            userId: Answer.userId, 
            questionId: Answer.questionId, 
            valid:true, 
        }, 
        defaults: {...Answer}
    })
    
    // 3 return result
    if(created) return status200(res,result)
    else return status400(res,'answer existed')
})

/**
 * get answers by question id
 * @route get /private/answer/GetAll
 * @group answer - Operations about answer
 * @param {string} questionId.query.required 
 * @param {integer} offset.query - optional, default 0
 * @param {integer} limit.query - optional, default max
 * @returns {Array.<answer>} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const SearchByQuestionID = asyncHandler(async (req, res, next) => {

    let {questionId,offset,limit} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_params = NotNullCheck([questionId])
    let Offset = offset || 0
    let Limit = limit || 10000

    if(!check_params){
        return status400(res,'invalid params')
    }
    
    // 2 find charts
    let result = await models.answer.findAll({ 
        where: {
            questionId,
        }, 
        offset:parseInt(Offset),
        limit:parseInt(Limit),
    })
    
    // 3 return array
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get answer by answer id 
 * @route get /private/answer
 * @group answer - Operations about answer
 * @param {string} id.query.required 
 * @returns {answer.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - question not existed
 * @security JWT
 */
 const GetAnswerByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find question by question id
    let result = await models.answer.findOne({ 
        where: {id}, 
    })
    
    // 3 return result
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update answer by answer id 
 * @route put /private/answer
 * @group answer - Operations about answer
 * @param {answer.model} answer.body - answer.id, is required, others are optional
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - answer not existed
 * @security JWT
 */
 const UpdateAnswerByID = asyncHandler(async (req, res, next) => {

    let Answer = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Answer.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.answer.update(Answer,{ 
        where: {
            id:Answer.id
        }, 
    })
    // 3 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete answer by answer id 
 * @route delete /private/answer
 * @group answer - Operations about answer
 * @param {string} id - answer.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - answer not existed
 * @security JWT
 */
 const DeleteAnswerByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.answer.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * like a answer
 * @route post /private/answer/like
 * @group answer - Operations about answer
 * @param {string} answerId.body.required - answer.id
 * @param {string} userId.body.required  - user.id
 * @returns {null} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const CreateLikes = asyncHandler( async (req, res, next) => {
    let Likes = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Likes.userId,Likes.answerId])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // 2 find or create answer by user id and question id
    let [result, created] = await models.likes.findOrCreate({ 
        where: {
            userId: Likes.userId, 
            answerId: Likes.answerId, 
            valid:true, 
        }
    })
    
    // 3 return result
    if(created) {
        // find answer and likes_count+1
        let Answer = await models.answer.findOne({ 
            where: {id:Likes.answerId}, 
        })
        Answer.likes_count=Answer.likes_count+1
        Answer.save()
        return status200(res)
    }
    else return status400(res,'cannot like twice')
})

/**
 * get like by user id and answer id
 * @route get /private/answer/like
 * @group answer - Operations about answer
 * @param {string} userId.body.required  - user.id
 * @param {string} answerId.body.required - answer.id
 * @returns {null} 200 - already liked this answer
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - have not likes this answer
 * @security JWT
 */
 const GetLikes = asyncHandler(async (req, res, next) => {

    let {userId,answerId} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([userId,answerId])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find question by question id
    let result = await models.likes.findOne({ 
        where: {
            userId: userId, 
            answerId: answerId, 
            valid:true, 
        }, 
    })
    
    // 3 return result
    if(result) return status200(res)
    else return status404(res)
})

/**
 * delete like by user id and answer id
 * @route delete /private/answer/like
 * @group answer - Operations about answer
 * @param {string} userId.body.required  - user.id
 * @param {string} answerId.body.required - answer.id
 * @returns {int} 200 - deleted, lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - have not likes this answer, cannot cancel 
 * @security JWT
 */
 const DeleteLikes = asyncHandler(async (req, res, next) => {

    let {userId,answerId} = req.body 

    // 1 id is required, need check first
    let check_id = NotNullCheck([userId,answerId])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.likes.destroy({ 
        where: {
            userId: userId, 
            answerId: answerId, 
        }, 
    })
    console.log(result)
    // 3 return
    if(result) {
        // find answer and likes_count+1
        let Answer = await models.answer.findOne({ 
            where: {id:answerId}, 
        })
        Answer.likes_count=Answer.likes_count-1
        Answer.save()
        return status200(res)
    }
    else return status400(res,'cannot delete')
})

module.exports = {
    CreateAnswer,
    SearchByQuestionID,GetAnswerByID,
    UpdateAnswerByID,
    DeleteAnswerByID,
    CreateLikes,
    GetLikes,
    DeleteLikes,
};
