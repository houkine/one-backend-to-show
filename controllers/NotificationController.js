const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const {NotNullCheck,DateTransfer,TimeTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create notification by user id and time
 * @route post /private/notification
 * @group notification - Operations about notification
 * @param {notification.model} notification.body - notification.userId,notification.time is required, others are optional,time format can accept moment.js format
 * @returns {notification.model} 200 
 * @returns {Error}  400 - invalid params, chart existed
 * @security JWT
 */
const CreateNotification = asyncHandler( async (req, res, next) => {
    let Notification = req.body // time foramt can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Notification.userId])
    let check_time = TimeTransfer(Notification.time)
    if(!check_params || check_time=='false'){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let [result, created] = await models.notification.findOrCreate({ 
        where: {
            userId: Notification.userId, 
            time: check_time,
            valid:true, 
        }, 
        defaults: {...Notification}
    })
    
    // 3 return record
    if(created) return status200(res,result)
    else return status400(res,'notification existed')
})

/**
 * get notifications by user id and title
 * @route get /private/notification/GetAll
 * @group notification - Operations about notification
 * @param {string} userId.query.required 
 * @returns {Array.<notification>} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const GetAllByUserID = asyncHandler(async (req, res, next) => {

    let {userId} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_userId = NotNullCheck([userId])
    if(!check_userId){
        return status400(res,'invalid params')
    }
    
    // 2 find charts
    let result = await models.notification.findAll({ 
        where: {
            userId,
            valid: true, 
        }, 
    })
    
    // 3 return a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get notification by notification id 
 * @route get /private/notification
 * @group notification - Operations about notification
 * @param {string} id.query.required 
 * @returns {notification.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - notification not existed
 * @security JWT
 */
 const GetNotificationByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by chart id
    let result = await models.notification.findOne({ 
        where: {
            id,
            valid: true, 
        }, 
    })
    
    // 3 return a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update notification by notification id 
 * @route put /private/notification
 * @group notification - Operations about notification
 * @param {notification.model} notification.body - notification.id, is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - notification not existed
 * @security JWT
 */
 const UpdateNotificationByID = asyncHandler(async (req, res, next) => {

    let Notification = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Notification.id])
    if(!check_id){
        return status400(res,'invalid params')
    }
    
    // 2 update time
    if(Notification.time){
        Notification.time = TimeTransfer(Notification.time)
    }
    
    // 3 find record by user id
    let result = await models.notification.update(Notification,{ 
        where: {
            id:Notification.id
        }, 
    })
    // 4 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete notification by notification id 
 * @route delete /private/notification
 * @group notification - Operations about notification
 * @param {string} id - notification.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - notification not existed
 * @security JWT
 */
 const DeleteNotificationByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.notification.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateNotification,
    GetAllByUserID,GetNotificationByID,
    UpdateNotificationByID,
    DeleteNotificationByID,
};
