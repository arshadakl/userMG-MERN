const express = require('express')
const router = express()
const bodyParser = require("body-parser")

// router.set('view engine', 'ejs');
// router.set('views','./views/user/')



router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({extended:true}))

const userController = require('../controllers/userController')
const authMdil = require('../middlewares/userMiddleware')

router.post('/login' , userController.doLogin)
router.post('/signup',userController.doSignup)
router.get('/logout',userController.doLogout)

router.get('/profile',authMdil.isLogin,userController.profilePage)


module.exports = router