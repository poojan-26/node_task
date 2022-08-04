const express = require('express')
const router = express.Router()
// const checkAuth = require('../api/v1/middleware/check-auth')
const userController = require('../api/v1/controllers/users.controller');
const roleController = require('../api/v1/controllers/role.controller');

//  here we have all user api
router.get('/user', userController.getUser)
router.post('/createuser', userController.createUser)
router.get('/user/:id', userController.findOne)
router.put('/updateuser/:id', userController.updateUser)
router.delete('/deleteuser/:id', userController.deleteUser)
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.put('/updateMany/:lastname', userController.updateMany)
router.get('/connectrole', userController.connectRole)


// here we have all role api
router.get('/role', roleController.getRole)
router.post('/createRole', roleController.createRole)
router.get('/role/:id', roleController.findOne)
router.put('/updaterole/:id', roleController.updateRole)
router.delete('/deleterole/:id', roleController.deleteRole)
router.get('/userlist', roleController.userList)



module.exports = router