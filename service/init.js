
const models = require('../models')

const process = () =>{
    initDatabase()
}



const initDatabase = () =>{
    // mealplan has multiple users, one user have one mealplan
    models.mealplan.hasMany(models.user)
    models.user.belongsTo(models.mealplan);

    // mealplan has multiple recipe, one recipe have one mealplan
    models.mealplan.hasMany(models.recipe)
    models.recipe.belongsTo(models.mealplan);

    // user has multiple records, one record have one user
    models.user.hasMany(models.record)
    models.record.belongsTo(models.user);

    // user has multiple charts, one chart have one user
    models.user.hasMany(models.chart)
    models.chart.belongsTo(models.user);

    // user has multiple favourites, one favourite have one user
    models.user.hasMany(models.favourite)
    models.favourite.belongsTo(models.user);

    // user has multiple events, one event have one user
    models.user.hasMany(models.event)
    models.event.belongsTo(models.user);

    // user has multiple events, one event have one user
    models.user.hasMany(models.notification)
    models.notification.belongsTo(models.user);

    // user has multiple events, one event have one user
    models.user.hasMany(models.pregnancyjourney)
    models.pregnancyjourney.belongsTo(models.user);

    // user has multiple questions, one question have one user
    models.user.hasMany(models.question)
    models.question.belongsTo(models.user);

    // user has multiple answers, one answer have one user
    models.user.hasMany(models.answer)
    models.answer.belongsTo(models.user);

    // question has multiple answers, one answer have one question
    models.question.hasMany(models.answer)
    models.answer.belongsTo(models.question);

    // user has multiple likes, one like have one user
    models.user.hasMany(models.likes)
    models.likes.belongsTo(models.user);

    // answer has multiple like, one like have one answer
    models.answer.hasMany(models.likes)
    models.likes.belongsTo(models.answer);


    models.mealplan.sync()
    models.user.sync()
    models.record.sync()
    models.chart.sync()
    models.favourite.sync()
    models.event.sync()
    models.notification.sync()
    models.pregnancyjourney.sync()
    models.recipe.sync()
    models.question.sync()
    models.answer.sync()
    models.likes.sync()
    models.article.sync()

}
process()
