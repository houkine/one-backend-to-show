const asyncHandler = require("../utils/asyncHandler")
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const models = require('../models')

const Test = asyncHandler(async (req, res, next) => {
    return status200(res,'Record Controller Testor')
})

/**
 * get record by user id and date
 * @route get /private/record/GetRecordByIDandDate
 * @group record - Operations about record
 * @param {string} user_id.query.required 
 * @param {string} date.query.required -'YYYY-MM-DD'
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - record not existed
 * @security JWT
 */
const GetRecordByIDandDate = asyncHandler(async (req, res, next) => {

    let {user_id,date} = req.query // date format should be 'YYYY-MM-DD'

    // 1 email,password are required, need check first
    let check_userId = NotNullCheck([user_id])
    let check_date = DateTransfer(date)
    if(!check_userId || check_date=='false'){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let record = await models.record.findOne({ 
        where: {
            userId: user_id, 
            date: check_date, 
        }, 
    })
    
    // 3 find a record
    if(record) return status200(res,record)
    else return status404(res)
})

/**
 * create record by user id and date
 * @route post /private/record
 * @group record - Operations about record
 * @param {Record.model} record.body - record.userId,record.date is required, others are optional,date format can accept moment.js format
 * @returns {Record.model} 200 - lines affected
 * @returns {Error}  400 - invalid params, record existed
 * @returns {Error}  404 - record not existed
 * @security JWT
 */
const CreateRecord = asyncHandler(async (req, res, next) => {

    let Record = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_userId = NotNullCheck([Record.userId])
    let check_date = DateTransfer(Record.date)
    if(!check_userId || check_date=='false'){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let [record, created] = await models.record.findOrCreate({ 
        where: {
            userId: Record.userId, 
            date: check_date, 
        }, 
        defaults: {...Record}
    })
    
    // 3 return record
    if(created) return status200(res,record)
    else return status400(res,'record existed')
})

/**
 * update record by user id and date
 * @route put /private/record
 * @group record - Operations about record
 * @param {Record.model} record.body - record.id is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - record not existed
 * @security JWT
 */
const UpdatRecord = asyncHandler(async (req, res, next) => {

    let newRecord = req.body

    // 1 email,password are required, need check first
    let check = NotNullCheck([newRecord.id])
    if(!check) return status400(res,'invalid params')

    if(Record.date){
        Record.date = DateTransfer(Record.date)
        if(Record.date=='false') return status400(res,'invalid params')
    }

    // 2 update process
    let result = await models.record.update(newRecord, {
        where: {
            id: newRecord.id
        }
    })

    // 3 return record
    return result==1?status200(res):status404(res)
})

/**
 * find record by record id
 * @route get /private/record
 * @group record - Operations about record
 * @param {string} id.query.required - record.id 
 * @returns {Record.model} 200 - entity
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - record not find
 * @security JWT
 */
const Retrieve = asyncHandler(async (req, res, next) =>{
    let {id} = req.query

    // 1 id required, need check first
    let check = NotNullCheck([id])
    if(!check) return status400(res,'invalid params')

    // 2 find record by record id
    let record = await models.record.findOne({id})

    // 3 find a record
    if(record) return status200(res,record)
    else return status404(res)
})

module.exports = {
    Test,
    GetRecordByIDandDate,Retrieve,
    CreateRecord,UpdatRecord,
};
