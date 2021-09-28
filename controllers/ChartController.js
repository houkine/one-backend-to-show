const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create chart by user id and title
 * @route post /private/chart
 * @group chart - Operations about chart
 * @param {chart.model} chart.body - chart.userId,chart.title，chart.date is required and unique, others are optional,date format can accept moment.js format
 * @returns {chart.model} 200 
 * @returns {Error}  400 - invalid params, chart existed
 * @security JWT
 */
const CreateChart = asyncHandler( async (req, res, next) => {
    let Chart = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Chart.userId,Chart.title])
    let check_date = DateTransfer(Chart.date)
    if(!check_params || check_date=='false'){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let [result, created] = await models.chart.findOrCreate({ 
        where: {
            userId: Chart.userId, 
            date: Chart.date,
            title: Chart.title,
            valid:true, 
        }, 
        defaults: {...Chart}
    })
    
    // 3 return record
    if(created) return status200(res,result)
    else return status400(res,'chart existed')
})

/**
 * get charts by user id and title
 * @route get /private/chart/Search
 * @group chart - get charts for make a graph
 * @param {string} userId.query.required 
 * @param {string} title.query.required 
 * @param {string} StartDate.query.required - can accept moment.js format
 * @param {string} EndDate.query.required - can accept moment.js format
 * @returns {Array.<chart>} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - chart not existed
 * @security JWT
 */
 const SearchByUserIDAndTitle = asyncHandler(async (req, res, next) => {

    let {userId,title,StartDate,EndDate} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_userId = NotNullCheck([userId,title])
    let check_StartDate = DateTransfer(StartDate)
    let check_EndDate = DateTransfer(EndDate)

    if(!check_userId || check_StartDate=='false' || check_EndDate=='false'){
        return status400(res,'invalid params')
    }
    
    // 2 find charts
    let result = await models.chart.findAll({ 
        where: {
            userId,title,
            [Op.and]:[
                {date:{[Op.gte]: check_StartDate}},
                {date:{[Op.lte]: check_EndDate}}
            ],
            // {[Op.and]:[date:{[Op.gte]: check_StartDate},
            // date:{[Op.lte]: check_EndDate},]},
            valid: true, 
        }, 
    })
    
    // 3 return a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get chart by chart id 
 * @route get /private/chart
 * @group chart - Operations about chart
 * @param {string} id.query.required 
 * @returns {chart.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - chart not existed
 * @security JWT
 */
 const GetChartByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by chart id
    let result = await models.chart.findOne({ 
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
 * put update chart by chart id 
 * @route put /private/chart
 * @group chart - Operations about chart
 * @param {chart.model} chart.body - chart.id, is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - chart not existed
 * @security JWT
 */
 const UpdateChartByID = asyncHandler(async (req, res, next) => {

    let Chart = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Chart.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.chart.update(Chart,{ 
        where: {
            id:Chart.id
        }, 
    })
    // 3 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete chart by chart id 
 * @route delete /private/chart
 * @group chart - Operations about chart
 * @param {string} id - chart.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - chart not existed
 * @security JWT
 */
 const DeleteChartByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.chart.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateChart,
    SearchByUserIDAndTitle,GetChartByID,
    UpdateChartByID,
    DeleteChartByID,
};
