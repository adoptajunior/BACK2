const express = require('express')
const router = express.Router()
const PostController = require('../Controllers/PostController')
const { authentication, isAdmin } = require('../Middlewares/authentication')

router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.get('/name/:name', PostController.getPostsByName)
router.post('/', authentication, isAdmin, PostController.create)
router.delete('/:_id', authentication, isAdmin, PostController.delete)
router.put('/:_id', authentication, isAdmin, PostController.update)

module.exports = router
