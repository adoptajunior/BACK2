const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')

router.get('/', UserController.getAll)
router.post('/', UserController.register)
router.post('/login', UserController.login)
// router.delete('/:_id', authentication, isAdmin, PostController.delete)
router.delete('/:_id', UserController.delete)


module.exports = router