const express = require('express')
const router = express()
const bodyParser = require("body-parser")

const fileUpload  = require('../middlewares/fileUpload')


router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({extended:true}))

const userController = require('../controllers/userController')
const authMdil = require('../middlewares/userMiddleware')

router.post('/login' , userController.doLogin)
router.post('/signup',userController.doSignup)
router.get('/logout',userController.doLogout)

router.get('/profile',authMdil.isLogin,userController.profilePage)

router.patch('/updateuser',authMdil.isLogin,userController.updateUser)
router.post('/updateimg',fileUpload.upload.single("image"),userController.updateUserImage)

module.exports = router