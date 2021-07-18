const router = require('express').Router();
const bcrypt = require('bcrypt')
// const { loginValidation } = require('../validation');
const user = require('../models/user')
const jwt = require('jsonwebtoken')




router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', async (req, res) => {
    // const { error } = loginValidation(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message)
    // }

    const USER = await user.findOne({ email: req.body.email });
    if (!USER) return res.status(400).send("Invalid email")

    const validPass = await bcrypt.compare(req.body.password, USER.password)
    if (!validPass) return res.status(400).send("Invalid password")



    const token = jwt.sign({ _id: USER._id }, process.env.TOKEN, { expiresIn: '10000s' })
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })
    // res.send("Welcome to iitk-campus discuss")
    let i = USER.flag;
    res.render('indexLogin.ejs', { i })
})

module.exports = router