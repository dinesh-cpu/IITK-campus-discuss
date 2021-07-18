const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    const Token = req.cookies;
    const token = Token.jwt;

    if (!token) {
        return res.status(401).send("please login to access this page");
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified

        // console.log(verified)
        next()
    } catch (err) {
        res.render('index.ejs')
    }
}