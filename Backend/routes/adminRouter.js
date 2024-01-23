const express = require('express')
const router = express()
const bodyParser = require("body-parser")

// router.set('view engine', 'ejs');
// router.set('views','./views/user/')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

const auth = require('../middlewares/adminMiddleware')
const adminController = require('../controllers/adminController')

router.post('/login',adminController.doLogin)
router.get('/allUsers',adminController.getAllUsers)
router.delete('/deleteuser/:id', auth.isLogin, adminController.deleteUser);
router.get('/edituser/:userid',auth.isLogin, adminController.getOneUser)
router.patch('/edituser',auth.isLogin, adminController.updateUser)

module.exports = router