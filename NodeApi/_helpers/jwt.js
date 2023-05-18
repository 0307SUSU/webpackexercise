const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

//expressJwt(...) returns a function that takes three paramaters req, res and next. Thus, this will register as
// middleware.
function jwt() {
    const secret = config.secret;
    return new expressJwt({
        secret,
        algorithms:['HS256'],
        allowCredentials:false,//设置为false表示游客也可以访问
    }).unless({
        path: [
            // public routes that don't require authentication
            '/',
        ]
    });
}