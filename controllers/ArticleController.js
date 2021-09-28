const asyncHandler = require("../utils/asyncHandler")
const { Op } = require("sequelize")
const models = require('../models')
const RecipeService = require('../service/RecipeService')
const {NotNullCheck,DateTransfer,TimeTransfer} = require('../utils/paramverify')
const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')

/**
 * create article, will always success, no limit in here
 * @route post /private/article
 * @group article - Operations about article
 * @param {article.model} recipe.body - category is required, others are optional
 * @returns {article.model} 200 
 * @returns {Error}  400 - invalid params, chart existed
 * @security JWT
 */
const CreateArticle = asyncHandler( async (req, res, next) => {
    let Article = req.body 
    
    // 1 email,password are required, need check first
    let check_params = NotNullCheck([Article.category])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // 2 find or create record by user id
    let result = await models.article.create(Article)
    
    // 3 return record
    return status200(res,result)
})

/**
 * get articles by category
 * @route get /private/article/Search
 * @group article - Operations about article
 * @param {string} category.query.required - (Nutrition/Stress....)
 * @param {integer} offset.query - optional, default 0
 * @param {integer} limit.query - optional, default max
 * @returns {Array.<article>} 200 - success
 * @returns {Error}  400 - invalid params
 * @security JWT
 */
 const SearchBycategory = asyncHandler(async (req, res, next) => {

    let {category,offset,limit} = req.query // date format should be 'YYYY-MM-DD'

    // 1 u_id is required, need check first
    let check_params = NotNullCheck([category])
    if(!check_params){
        return status400(res,'invalid params')
    }
    let Offset = offset || 0
    let Limit = limit || 10000
    
    // 2 find charts
    let result = await models.article.findAll({ 
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
 * get article by article id 
 * @route get /private/article
 * @group article - Operations about article
 * @param {string} id.query.required 
 * @returns {article.model} 200 - success
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - recipe not existed
 * @security JWT
 */
 const GetArticleByID = asyncHandler(async (req, res, next) => {

    let {id} = req.query 

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 find result by recipe id
    let result = await models.article.findOne({ 
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
 * put update article by article id 
 * @route put /private/article
 * @group article - Operations about article
 * @param {article.model} article.body - article.id, is required, others are optional,date format can accept moment.js format
 * @returns {int} 200 - success, nothing return
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - article not existed
 * @security JWT
 */
 const UpdateArticleByID = asyncHandler(async (req, res, next) => {

    let Article = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([Article.id])
    if(!check_id){
        return status400(res,'invalid params')
    }
    
    // 2 find record by user id
    let result = await models.article.update(Article,{ 
        where: {
            id:Article.id
        }, 
    })
    // 4 find a record
    if(result==1) return status200(res)
    else return status404(res)
})

/**
 * delete article by article id 
 * @route delete /private/article
 * @group article - Operations about article
 * @param {string} id - article.id is required
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - article not existed
 * @security JWT
 */
 const DeleteArticleByID = asyncHandler(async (req, res, next) => {

    let {id} = req.body // date format best be 'YYYY-MM-DD', can accept moment.js format

    // 1 id is required, need check first
    let check_id = NotNullCheck([id])
    if(!check_id){
        return status400(res,'invalid params')
    }

    // 2 delete by pregnancyjourney id
    let result = await models.article.destroy({ 
        where: {id}, 
    })
    
    // 3 return
    if(result) return status200(res,result)
    else return status404(res)
})

module.exports = {
    CreateArticle,
    SearchBycategory,GetArticleByID,
    UpdateArticleByID,
    DeleteArticleByID,
};

