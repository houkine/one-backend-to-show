const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const {NotNullCheck,DateTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create favourite by user id and name
 * @route post /private/favourite
 * @group favourite - Operations about favourite
 * @param {favourite.model} favourite.body - favourite.userId,favourite.name is required and unique, others are optional
 * @returns {favourite.model} 200 - success
 * @returns {Error}  400 - invalid params, chart existed
 * @security JWT
 */
const CreateFavourite = asyncHandler( async (req, res, next) => {
    let Favourite = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Favourite.userId,Favourite.name])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let [result, created] = await models.favourite.findOrCreate({ 
        where: {
            userId: Favourite.userId, 
            name: Favourite.name,
        }, 
        defaults: {...Favourite}
    })
    
    // 3 return record
    if(created) return status200(res,result)
    else return status400(res,'favourite existed')
})

/**
 * get favourites by user id
 * @route get /private/favourite/GetAll
 * @group favourite - Operations about favourite
 * @param {string} userId.query.required 
 * @param {integer} offset.query - optional, default 0
 * @param {integer} limit.query - optional, default max
 * @returns {Array.<favourite>} 200 - success
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
    let result = await models.favourite.findAll({ 
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
 * get favourite by favourite id 
 * @route get /private/favourite
 * @group favourite - Operations about favourite
 * @param {string} id.query.required 
 * @returns {favourite.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - favourite not existed
 * @security JWT
 */
 const GetFavouriteByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find favourite by favourite id
    let result = await models.favourite.findOne({ 
        where: {id}, 
    })
    
    // 3 return result
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update favourite by favourite id 
 * @route put /private/favourite
 * @group favourite - Operations about favourite
 * @param {favourite.model} favourite.body - favourite.id, is required, others are optional
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - favourite not existed
 * @security JWT
 */
 const UpdateFavouriteByID = asyncHandler(async (req, res, next) => {

    let Favourite = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Favourite.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find record by user id
    let result = await models.favourite.update(Favourite,{ 
        where: {
            id:Favourite.id
        }, 
    })
    // 3 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete favourite by favourite id 
 * @route delete /private/favourite
 * @group favourite - Operations about favourite
 * @param {string} id - favourite.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - favourite not existed
 * @security JWT
 */
 const DeleteFavouriteByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.favourite.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateFavourite,
    SearchByUserID,GetFavouriteByID,
    UpdateFavouriteByID,
    DeleteFavouriteByID,
};
