const router = require('express').Router();
const bcrypt = require('bcryptjs')
const user = require('../models/user')


const { signupValidation } = require('../validation');


router.get('/', (req, res) => {
    res.render('signup.ejs')
})

router.post('/', async (req, res) => {
    // const { error } = signupValidation(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message)
    // }
    const emailexist = await user.findOne({ email: req.body.email });
    if (emailexist) return res.status(400).send("user alredy exist")
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt)

    const User = new user({
        name: req.body.name,
        mobileno: req.body.mobileno,
        password: hashpassword,
        email: req.body.email,
        flag: 0,
        rollno: req.body.rollno

    });
    try {
        const saveduser = await User.save()
        // res.render('indexLogin.ejs')
        res.send('Please verify your email to complete your registeration')
        //res.render("indexLogin.ejs")
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router