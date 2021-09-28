module.exports=app=>{
    const expressSwagger = require('express-swagger-generator')(app);
    
    let options = {
        swaggerDefinition: {
            info: {
                description: 'bloom express',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['../controllers/*.js','../models/*.js'] //Path to the API handle folder
    };
    expressSwagger(options)

}
