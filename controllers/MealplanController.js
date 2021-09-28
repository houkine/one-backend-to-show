const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const MealplanService = require('../service/MealplanService')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create mealplan by name
 * @route post /private/mealplan
 * @group mealplan - Operations about mealplan
 * @param {mealplan.model} mealplan.body - mealplan.name is required and unique, others are optional,duration is int stand for total days
 * @returns {mealplan.model} 200 
 * @returns {Error}  400 - invalid params, mealplan existed
 * @security JWT
 */
const CreateMealplan = asyncHandler( async (req, res, next) => {
    let Mealplan = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Mealplan.name])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let [result, created] = await models.mealplan.findOrCreate({ 
        where: {
            name: Mealplan.name, 
        }, 
        defaults: {...Mealplan}
    })
    
    // 3 return record
    if(created) return status200(res,result)
    else return status400(res,'chart existed')
})

/**
 * user pick a mealplan.
 * @route post /private/mealplan/AssignToUser
 * @group mealplan - Operations about mealplan
 * @param {string} userId.query.required - from user
 * @param {string} mealplanId.query.required - from mealplan
 * @param {string} StartDate.query.required - any form from moment.js
 * @returns {null} 200 - nothing return, but notice, after doing this, records will be updated by recipes, so fresh records anytime
 * @returns {Error}  400 - invalid params, mealplan existed
 * @security JWT
 */
 const AssignMealplan = asyncHandler( async (req, res, next) => {
    let {userId,mealplanId,StartDate} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 userId,mealplanId,StartDate are required, need check first
    let check_params = NotNullCheck([userId,mealplanId])
    let check_date = DateTransfer(StartDate)
    if(!check_params || check_date=='false'){
        return status400(res,'invalid params')
    }

    // 2 find user
    let User = await models.user.findOne({id:userId})
    if(!User) return status400(res,'user not found')

    // 3 find mealplan
    let MealPlan = await models.mealplan.findOne({id:mealplanId})
    if(!MealPlan) return status400(res,'mealplanId not found')
    // console.log('AssignMealplan - '+MealPlan.Breakfastrecipes)

    // 4 add mealplan to user
    let result = await MealPlan.addUser(User)
    if(!result) return status400(res,'process failed')

    // 5 change all records set meals to it
    MealplanService.AssignMealplanToUser(MealPlan,User,StartDate)

    // 6 return result
    status200(res)

})

/**
 * get mealplans 
 * @route get /private/mealplan/Search
 * @group mealplan - get mealplans
 * @param {string} recommand.query - optional, default '', can be set to recommand filter, not in use now, do pick in order by create time
 * @param {integer} offset.query - optional, default 0
 * @param {integer} limit.query - optional, default max
 * @returns {Array.<chart>} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const SearchMealplan = asyncHandler(async (req, res, next) => {

    let {recommand,offset,limit} = req.query // date format should be 'YYYY-MM-DD'

    // 1 init params
    let Offset = offset || 0
    let Limit = limit || 10000
    
    // 2 find mealplans
    let result = await models.mealplan.findAll({ 
        where: {
            [Op.and]:[
                recommand?{recommand}:{},
                {valid: true}, 
            ]
        }, 
        offset:parseInt(Offset),
        limit:parseInt(Limit),
    })
    
    // 3 return a list of results
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get mealplan by mealplan id 
 * @route get /private/mealplan
 * @group mealplan - Operations about mealplan
 * @param {string} id.query.required 
 * @returns {mealplan.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - mealplan not existed
 * @security JWT
 */
 const GetMealplanByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by chart id
    let result = await models.mealplan.findOne({ 
        where: {
            id,
        }, 
    })
    
    // 3 return a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update mealplan by mealplan id 
 * @route put /private/mealplan
 * @group mealplan - Operations about mealplan
 * @param {mealplan.model} mealplan.body - mealplan.id, is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - mealplan not existed
 * @security JWT
 */
 const UpdateMealplanByID = asyncHandler(async (req, res, next) => {

    let Mealplan = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Mealplan.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.mealplan.update(Mealplan,{ 
        where: {
            id:Mealplan.id
        }, 
    })
    // 3 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete mealplan by mealplan id 
 * @route delete /private/mealplan
 * @group mealplan - Operations about mealplan
 * @param {string} id - mealplan.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - mealplan not existed
 * @security JWT
 */
 const DeleteMealplanByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.mealplan.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateMealplan,AssignMealplan,
    SearchMealplan,GetMealplanByID,
    UpdateMealplanByID,
    DeleteMealplanByID,
};

