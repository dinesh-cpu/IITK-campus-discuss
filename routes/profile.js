const router = require('express').Router();
// const jwt = require('jsonwebtoken')
const verify = require('./verifytoken')
const user = require('../models/user')

router.get('/', verify, async (req, res) => {
    const id = req.user._id;
    const usrdata = await user.findOne({ _id: id })
    if (!usrdata) return res.status(400).render('error.ejs')
    if (usrdata.flag != 1) return res.status(400).send("Please verify your email to acces this page")
    // const data = req.params()
    res.render('profile.ejs')
})

module.exports = router