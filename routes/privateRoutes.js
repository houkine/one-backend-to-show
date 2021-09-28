
var express = require('express');
var router = express.Router();
const {
    Test,
    User,
    Record,
    PregnancyJourney,
    Chart,
    Favourite,
    Notification,
    Mealplan,
    Recipe,
    Question,
    Answer,
    Article,
} = require("../controllers");

// test
router.route('/test').get(Test.TestPrivate);

// user
router.route('/user').get(User.Retrieve);
router.route('/user').put(User.Update);
router.route('/user/Subscribe').put(User.Subscribe);

// record
router.route('/record').get(Record.Retrieve);
router.route('/record').post(Record.CreateRecord);
router.route('/record').put(Record.UpdatRecord);
router.route('/record/GetRecordByIDandDate').get(Record.GetRecordByIDandDate);

// PregnancyJourney
router.route('/pregnancyjourney').get(PregnancyJourney.GetPregnancyJourneyByID);
router.route('/pregnancyjourney').put(PregnancyJourney.UpdatePregnancyJourneyByID);
router.route('/pregnancyjourney').post(PregnancyJourney.CreatePregnancyJourney);
router.route('/pregnancyjourney').delete(PregnancyJourney.DeletePregnancyJourneyByID);
router.route('/pregnancyjourney/GetByUserID').get(PregnancyJourney.GetPregnancyJourneyByUserID);

// Chart
router.route('/chart').get(Chart.GetChartByID);
router.route('/chart').put(Chart.UpdateChartByID);
router.route('/chart').post(Chart.CreateChart);
router.route('/chart').delete(Chart.DeleteChartByID);
router.route('/chart/search').get(Chart.SearchByUserIDAndTitle);

// Favourite
router.route('/favourite').post(Favourite.CreateFavourite);
router.route('/favourite').get(Favourite.GetFavouriteByID);
router.route('/favourite').put(Favourite.UpdateFavouriteByID);
router.route('/favourite').delete(Favourite.DeleteFavouriteByID);
router.route('/favourite/GetAll').get(Favourite.SearchByUserID);

// Notification
router.route('/notification').post(Notification.CreateNotification);
router.route('/notification').get(Notification.GetNotificationByID);
router.route('/notification').put(Notification.UpdateNotificationByID);
router.route('/notification').delete(Notification.DeleteNotificationByID);
router.route('/notification/GetAll').get(Notification.GetAllByUserID);

// Mealplan
router.route('/mealplan').post(Mealplan.CreateMealplan);
router.route('/mealplan/AssignToUser').post(Mealplan.AssignMealplan);
router.route('/mealplan').get(Mealplan.GetMealplanByID);
router.route('/mealplan').put(Mealplan.UpdateMealplanByID);
router.route('/mealplan').delete(Mealplan.DeleteMealplanByID);
router.route('/mealplan/Search').get(Mealplan.SearchMealplan);

// Recipe
router.route('/recipe').post(Recipe.CreateRecipe);
router.route('/recipe').get(Recipe.GetRecipeByID);
router.route('/recipe').put(Recipe.UpdateRecipeByID);
router.route('/recipe').delete(Recipe.DeleteRecipeByID);
router.route('/recipe/Search').get(Recipe.SearchBycategory);

// Question
router.route('/question').post(Question.CreateQuestion);
router.route('/question').get(Question.GetQuestionByID);
router.route('/question').put(Question.UpdateQuestionByID);
router.route('/question').delete(Question.DeleteQuestionByID);
router.route('/question/GetAll').get(Question.SearchByUserID);

// Answer
router.route('/answer').post(Answer.CreateAnswer);
router.route('/answer').get(Answer.GetAnswerByID);
router.route('/answer').put(Answer.UpdateAnswerByID);
router.route('/answer').delete(Answer.DeleteAnswerByID);
router.route('/answer/GetAll').get(Answer.SearchByQuestionID);
router.route('/answer/like').post(Answer.CreateLikes);
router.route('/answer/like').get(Answer.GetLikes);
router.route('/answer/like').delete(Answer.DeleteLikes);

// Article
router.route('/article').post(Article.CreateArticle);
router.route('/article').get(Article.GetArticleByID);
router.route('/article').put(Article.UpdateArticleByID);
router.route('/article').delete(Article.DeleteArticleByID);
router.route('/article/Search').get(Article.SearchBycategory);


module.exports = router;
