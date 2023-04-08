const express = require('express')
const router = express.Router();
const dashboard = require('../controller/dashboard')
const register = require('../controller/register')


router.get("/",(req,res)=>{
    res.send("Hello");
})

// router.get('/register')

router.get("/register",register.register);
router.get("/login",register.login);
// router.get("/dashboard",dashboard);

module.exports = router;