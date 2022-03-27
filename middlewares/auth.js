const jwt = require('jsonwebtoken');

function valideToken(req,res,next) {
    let token = req.headers['x-access-token'];

    if(!token)
        return res.status(403).send('A token is required.');
    try {
        //token = Bearer jwtToken
        //let arr = token.split(' ');
        //console.log(token);
        let decoded = jwt.verify(token,'jwtSecret');
        
        req.user=decoded;
    } catch (error) {
        return res.status(403).send('Invalid Token : '+error.message);
    }
    next();
};

module.exports=valideToken;