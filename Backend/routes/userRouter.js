const express = require('express')
const router = express()
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')

// router.set('view engine', 'ejs');
// router.set('views','./views/user/')



router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({extended:true}))

const userController = require('../controllers/userController')


router.post('/login',userController.doLogin)
router.post('/signup',userController.doSignup)


module.exports = router