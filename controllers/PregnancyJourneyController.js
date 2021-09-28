const asyncHandler = require("../utils/asyncHandler")
const models = require('../models')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create record by user id and date
 * @route post /private/pregnancyjourney
 * @group pregnancyjourney - Operations about pregnancyjourney
 * @param {pregnancyjourney.model} pregnancyjourney.body - pregnancyjourney.userId,pregnancyjourney.started is required, others are optional,date format can accept moment.js format
 * @returns {pregnancyjourney.model} 200 
 * @returns {Error}  400 - invalid params, pregnancyjourney existed
 * @security JWT
 */
const CreatePregnancyJourney = asyncHandler( async (req, res, next) => {
    let PregnancyJourney = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 userId,started are required, need check first
    let check_userId = NotNullCheck([PregnancyJourney.userId])
    let check_date = DateTransfer(PregnancyJourney.started)
    if(!check_userId || check_date=='false'){
        return status400(res,'invalid params')
    }

    // 2 find or create by user id
    let [result, created] = await models.pregnancyjourney.findOrCreate({ 
        where: {
            userId: PregnancyJourney.userId, 
            // started: PregnancyJourney.started,
            valid:true, 
        }, 
        defaults: {...PregnancyJourney}
    })
    
    // 3 return pregnancyjourney
    if(created) return status200(res,result)
    else return status400(res,'pregnancyjourney existed')
})

/**
 * get pregnancyjourney by user id 
 * @route get /private/pregnancyjourney/GetByUserID
 * @group pregnancyjourney - Operations about pregnancyjourney
 * @param {string} user_id.query.required 
 * @returns {pregnancyjourney.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - pregnancyjourney not existed
 * @security JWT
 */
 const GetPregnancyJourneyByUserID = asyncHandler(async (req, res, next) => {

    let {user_id} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_userId = NotNullCheck([user_id])
    if(!check_userId){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.pregnancyjourney.findOne({ 
        where: {
            userId: user_id, 
            valid: true, 
        }, 
    })
    
    // 3 find a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get pregnancyjourney by pregnancyjourney id 
 * @route get /private/pregnancyjourney
 * @group pregnancyjourney - Operations about pregnancyjourney
 * @param {string} id.query.required 
 * @returns {pregnancyjourney.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - pregnancyjourney not existed
 * @security JWT
 */
 const GetPregnancyJourneyByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.pregnancyjourney.findOne({ 
        where: {
            id,
            valid: true, 
        }, 
    })
    
    // 3 find a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update pregnancyjourney by pregnancyjourney id 
 * @route put /private/pregnancyjourney
 * @group pregnancyjourney - Operations about pregnancyjourney
 * @param {pregnancyjourney.model} pregnancyjourney.body - pregnancyjourney.id, is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - pregnancyjourney not existed
 * @security JWT
 */
 const UpdatePregnancyJourneyByID = asyncHandler(async (req, res, next) => {

    let PregnancyJourney = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([PregnancyJourney.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.pregnancyjourney.update(PregnancyJourney,{ 
        where: {
            id:PregnancyJourney.id
        }, 
    })
    
    // 3 find a record
    if(result) return status200(res)
    else return status404(res)
})

/**
 * delete pregnancyjourney by pregnancyjourney id 
 * @route delete /private/pregnancyjourney
 * @group pregnancyjourney - Operations about pregnancyjourney
 * @param {string} id - pregnancyjourney.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - pregnancyjourney not existed
 * @security JWT
 */
 const DeletePregnancyJourneyByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.pregnancyjourney.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreatePregnancyJourney,
    GetPregnancyJourneyByID,GetPregnancyJourneyByUserID,
    UpdatePregnancyJourneyByID,
    DeletePregnancyJourneyByID,
};
