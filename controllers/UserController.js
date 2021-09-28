const {status200,status400,status401,status404,status500} = require('../utils/responseHandler')
const {NotNullCheck} = require('../utils/paramverify')
const asyncHandler = require("../utils/asyncHandler")
const authService = require('../service/authService')
const crypt = require('../utils/crypt')
const models = require('../models')
const { Sequelize,DataTypes } = require("sequelize");
const moment = require('moment')
const auth0 = require('auth0-js')

const domain = 'http://127.0.0.1:3000'
const clientID = 'xFuRrj7V5Cb8RgQNaJ1GDKdVDi2tCDFq'
var auth = new auth0.WebAuth({
    domain,
    clientID,
});

const Test = asyncHandler(async (req, res , next) => {

    return status200(res,'test user controller')
})

/**
 * regist user by email and save locally
 * @route post /public/user/Regist
 * @group user - Operations about user
 * @param {string} email.body.required
 * @param {string} FirstName.body.required
 * @param {string} LastName.body.required
 * @param {string} password.body.required
 * @returns {Auth.model} 200 - token and user
 * @returns {Error}  400 - invalid params / user already existed
 */
const RegistToLocal = asyncHandler(async (req, res, next) => {

    let {email,FirstName,LastName,password} = req.body

    // 1 email,FirstName,LastName,password are required, need check first
    let check = NotNullCheck([email,FirstName,LastName,password])
    if(!check) return status400(res,'invalid params')

    // 2 encrypt password
    let encryptedPassword = await crypt.encrypt(password)

    // 3 set last login date
    let lastLogin = moment().format()

    // 4 check and save user
    let [user, created] = await models.user.findOrCreate({
        where: { email },
        defaults: {
            password:encryptedPassword,
            FirstName,LastName,
            lastLogin,
        }
    })

    // 3.1 if user existed, return 400
    if(!created){
        return status400(res,'user already existed')
    }
    
    // 4 generate token
    let payload = user.id
    const token = authService().issue({ payload });

    // 5 return token and user
    return status200(res,{token,user})
})

/**
 * regist user by email and save to auto0
 * @route post /public/user/Regist
 * @group user - Operations about user
 * @param {string} email.body.required
 * @param {string} FirstName.body.required
 * @param {string} LastName.body.required
 * @param {string} password.body.required - at least 8 characters
 * @returns {Auth.model} 200 - token and user
 * @returns {Error}  400 - invalid params / user already existed
 */
 const RegistToAuth0 = asyncHandler(async (req, res, next) => {

    let {email,FirstName,LastName,password} = req.body

    // 1 email,FirstName,LastName,password are required, need check first
    let check = NotNullCheck([email,FirstName,LastName,password])
    if(!check) return status400(res,'invalid params')

    // 2 encrypt password
    let encryptedPassword = await crypt.encrypt(password)

    // 3 set last login date
    let lastLogin = moment().format()

    // 4 check and save user to local
    let [user, created] = await models.user.findOrCreate({
        where: { email },
        defaults: {
            password:encryptedPassword,
            FirstName,LastName,
            lastLogin,
        }
    })

    // 3.1 if user existed, return 400
    if(!created){
        return status400(res,'user already existed')
    }
    
    // 4 sign up to auto0
    auth.signup({ 
        connection: 'bloom', 
        email, 
        password,
        username: FirstName+' '+LastName,
        given_name: FirstName,
        family_name: LastName,
    }, function (err) { 
        if (err) return alert('Something went wrong: ' + err.message); 
          return alert('success signup without login!') 
    });

    // 5 get login url
    var url = auth.client.buildAuthorizeUrl({
        clientID, 
        connection: 'bloom', 
        responseType: 'token', // code or token
        redirectUri: domain+'/success',
        scope: 'openid profile email',
    });
    // 6 redirect to login page, auto0 need user login after they signup
    return req.redirect(url)
})

/**
 * email login
 * @route post /public/user/EmailLogin
 * @group user - Operations about user
 * @param {string} email.body.required
 * @param {string} password.body.required
 * @returns {Auth.model} 200 - token and user
 * @returns {Error}  400 - invalid params / password incorrect
 * @returns {Error}  404 - user not existed
 */
const EmailLogin = asyncHandler(async (req, res, next) => {
    let {email,password} = req.body

    // 1 email,password are required, need check first
    let check = NotNullCheck([email,password])
    if(!check) return status400(res,'invalid params')

    //2 find user by email 
    const user = await models.user.findOne({ where: { email } });

    //3 check user is existed 
    if (user === null) {
        return status404(res)
    //4 check password validation
    } else if(await crypt.compare(user.password,password)){
        console.log('login:'+user.email)
        // 5 generate token
        const token = authService().issue({ payload:user.id });
        // 6 set up Streak
        switch (moment().diff(user.lastLogin,'days')) {
            case 0:
                // login in today again, nothing changes
                break;
            case 1:
                //keep login everyday
                user.CurrentStreak=user.CurrentStreak+1
                if(user.CurrentStreak>user.LongestStreak){
                    user.LongestStreak=user.CurrentStreak
                }
                break;
            default:
                // login break
                user.CurrentStreak = 1
                
                break;
        }
        user.lastLogin = moment().format()
        // 7 update user state
        user.save()

        return status200(res,{token,user})
    }else{
        //4.1 password not correct
        return status400(res,'password incorrect')
    }
})

const GoogleLogin = asyncHandler(async (req, res, next) => {
    return status200(res,'testPrivate')
})

const AppleLogin = asyncHandler(async (req, res, next) => {
    return status200(res,'testPrivate')
})

/**
 * find user by id
 * @route get /private/user
 * @group user - Operations about user
 * @param {string} id.query.required
 * @returns {User.model} 200 - token and user
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - user not existed
 * @security JWT
 */
const Retrieve = asyncHandler(async (req, res, next) => {
    let {id} = req.query

    // 1 id required, need check first
    let check = NotNullCheck([id])
    if(!check) return status400(res,'invalid params')
    
    // 2 find a user by model
    let user = await models.user.findOne({id})
    
    // 3 check user and return, 
    return user?status200(res,user):status404(res)
})

/**
 * update user by id
 * @route put /private/user
 * @group user - Operations about user
 * @param {User.model} user.body - User.id is required, others are optional
 * @returns {int} 200 - lines affected
 * @returns {Error}  400 - invalid params
 * @returns {Error}  404 - user not existed
 * @security JWT
 */
const Update = asyncHandler(async (req, res, next) => {
    let User = req.body
    
    // 1 id required, need check first
    // if(typeof User.id == 'undefined') return status400(res,'invalid params')
    let check = NotNullCheck([User.id])
    if(!check) return status400(res,'invalid params')
    
    // 2 update user by User.id
    let result = await models.user.update(User,{where: {
            id: User.id
        }
    })
    
    // 3 check user and return, 
    return result==1?status200(res):status404(res)
})

/**
 * Subscribe by stripe
 * @route post /private/user/Subscribe
 * @group user - Operations about user
 * @param {string} id.query.required - user id
 * @param {string} plan.body.required - 1/3/12
 * @param {string} token.body - optional card token, if they are not a customer, they will need this 
 * @returns {null} 200 - token and user
 * @returns {Error}  400 - invalid params / Subscribe failed, may be no balance
 * @returns {Error}  404 - user cannot find
 * @security JWT
 */
 const Subscribe = asyncHandler(async (req, res , next) => {

    let {id,plan,token} = req.query

    let check_params = NotNullCheck([id,plan,token])
    if(!check_params){
        return status400(res,'invalid params')
    }

    // get user by id
    let user = await models.user.findOne({id})
    if(!user) return status404(res)

    if(user.stripe_id==''){
        // already a customer
        // 1 start subscription
        const subscription = await stripe.subscriptions.create({
            customer: user.stripe_id,
            items: [{price:getPriceByPlan(plan)},],
        });
        return status200(res)
    }else{
        // not yet a customer
        // 1 create one
        const customer = await stripe.customers.create({
            email:user.email,
            source: token,
        });

        // 2 start subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{price:getPriceByPlan(plan)},],
        });

        // 3 save it to db
        user.stripe_id = customer.id
        user.save()
        return status200(res)
    }
})

const GetAuth = asyncHandler(async (req, res, next) => {
    let payload = 'test'
    const token = authService().issue({ payload });
    return status200(res,token)
})
module.exports = {
    Test,
    RegistToLocal,RegistToAuth0,
    EmailLogin,GoogleLogin,AppleLogin,
    Retrieve,Update,
    GetAuth,
    Subscribe,
};



/**
 * @typedef Auth
 * @property {string} token
 * @property {User.model} user
 */

const getPriceByPlan = (plan) =>({
    1:'',
    2:'',
    12:'',
}[plan])