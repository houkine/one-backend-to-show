const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const RecipeService = require('../service/RecipeService')
const {NotNullCheck,DateTransfer,TimeTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create recipe, will always success, no limit inhere
 * @route post /private/recipe
 * @group recipe - Operations about notification
 * @param {recipe.model} recipe.body - recipe.category (breakfast/lunch....) is required, other fields are optional,time format is a string like '10 min'
 * @returns {recipe.model} 200 
 * @returns {Error}  400 - invalid params, chart existed
 * @security JWT
 */
const CreateRecipe = asyncHandler( async (req, res, next) => {
    let Recipe = req.body // time foramt can accept moment.js format
    
    // 1 email,password are required, need check first
    let check_params = RecipeService.CheckCategory(Recipe.category)
    if(!check_params) return status400(res,'invalid params')

    // 2 find or create record by user id
    let result = await models.recipe.create(Recipe)
    
    // 3 return record
    return status200(res,result)
})

/**
 * get recipes by category
 * @route get /private/recipe/search
 * @group recipe - Operations about recipe
 * @param {string} category.query.required - (breakfast/lunch....)
 * @param {integer} offset.query - optional, default 0
 * @param {integer} limit.query - optional, default max
 * @returns {Array.<recipe>} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const SearchBycategory = asyncHandler(async (req, res, next) => {

    let {category,offset,limit} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_params = RecipeService.CheckCategory(category)
    if(!check_params){
        return status400(res,'invalid params')
    }
    let Offset = offset || 0
    let Limit = limit || 10000
    
    // 2 find charts
    let result = await models.recipe.findAll({ 
        where: {
            category,
            valid: true, 
        }, 
        offset:parseInt(Offset),
        limit:parseInt(Limit),
    })
    
    // 3 return a record
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * get recipe by recipe id 
 * @route get /private/recipe
 * @group recipe - Operations about recipe
 * @param {string} id.query.required 
 * @returns {recipe.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - recipe not existed
 * @security JWT
 */
 const GetRecipeByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find result by recipe id
    let result = await models.recipe.findOne({ 
        where: {
            id,
            valid: true, 
        }, 
    })
    
    // 3 return a result
    if(result) return status200(res,result)
    else return status404(res)
})

/**
 * put update recipe by recipe id 
 * @route put /private/recipe
 * @group recipe - Operations about recipe
 * @param {recipe.model} recipe.body - recipe.id, is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - recipe not existed
 * @security JWT
 */
 const UpdateRecipeByID = asyncHandler(async (req, res, next) => {

    let Recipe = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Recipe.id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 if has category check it
    if(Recipe.category){
        let check_category = RecipeService.CheckCategory(Recipe.category)
        if(!check_category) return status400(res,'invalid params category')
    }
    
    // 3 find record by user id
    let result = await models.recipe.update(Recipe,{ 
        where: {
            id:Recipe.id
        }, 
    })
    // 4 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete recipe by recipe id 
 * @route delete /private/recipe
 * @group recipe - Operations about recipe
 * @param {string} id - recipe.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - recipe not existed
 * @security JWT
 */
 const DeleteRecipeByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.recipe.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateRecipe,
    SearchBycategory,GetRecipeByID,
    UpdateRecipeByID,
    DeleteRecipeByID,
};

