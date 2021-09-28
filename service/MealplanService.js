const models = require("../models");
const moment = require('moment')

/**
 * assign mealplan to user, will put recipes to records
 * @param {a mealplan} mealplan 
 * @param {a user} user 
 * @returns {boolean}, true - done, false - error
 */
 module.exports.AssignMealplanToUser = async (MealPlan,User,StartDate) => {
    // 1 check mealplan valiable. satisfied with following:
    //  - recipes join by '#' and same length with duration
    //  - valid is true
    //  - start date should be today or in the future
    let breakfastRecipes = MealPlan.Breakfastrecipes.split('#')
    let Snackrecipes = MealPlan.Snackrecipes.split('#')
    let lunchrecipes = MealPlan.lunchrecipes.split('#')
    let Dinnerrecipes = MealPlan.Dinnerrecipes.split('#')
    
    // deprecated. if length not match with duration, fill with blank
    // if(
    //     breakfastRecipes.length!=mealplan.duration ||
    //     Snackrecipes.length!=mealplan.duration ||
    //     lunchrecipes.length!=mealplan.duration ||
    //     Dinnerrecipes.length!=mealplan.duration 
    // ) return false
    
    if(!MealPlan.valid) return false
    
    let startdate = moment(StartDate)
    let now = moment()
    if(startdate.isBefore(now,'day')) return false

    // 2 find all records by date, start from StartDate, start date should be date fromat
    let tagdate = moment(StartDate) // current date used for trigger record
    for (let index = 0; index < MealPlan.duration; index++) {

        //  prepare params for record
        let date = tagdate.format('YYYY-MM-DD')

        // get record by user id and date. If not exist, create one
        let [result, created] = await models.record.findOrCreate({ 
            where: {
                userId: User.id, 
                date,
            }
        }) 

        // put params into record entity
        if(breakfastRecipes[index]) {
            let BreakfastRecord = (await models.recipe.findOne({where:{
                id:breakfastRecipes[index],
                valid: true,
            }}))
            result.Breakfast=BreakfastRecord.name
        }
        if(Snackrecipes[index]) {
            let SnackRecord = (await models.recipe.findOne({where:{
                id:Snackrecipes[index],
                valid: true,
            }}))
            result.Snacks=SnackRecord.name
        }
        if(lunchrecipes[index]) {
            let LunchRecord = (await models.recipe.findOne({where:{
                id:lunchrecipes[index],
                valid: true,
            }}))
            result.Lunch=LunchRecord.name
        }
        if(Dinnerrecipes[index]) {
            let DinnerRecord = (await models.recipe.findOne({where:{
                id:Dinnerrecipes[index],
                valid: true,
            }}))
            result.Dinner=DinnerRecord.name
        }

        // update execute
        result.save();

        // update time
        tagdate.add({days:1})
    }

    
}