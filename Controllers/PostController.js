const Post = require('../models/Post')

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el post' })
        }
    },
    async getAll(req, res) {
        try {
            const posts = await Post.find()
            res.send(posts)
        } catch (error) {
            console.error(error)
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error)
        }
    },
    async getPostsByName(req, res) {
        try {
            if (req.params.name.length > 20) {
                return res.status(400).send('Búsqueda demasiado larga')
            }
            const name = new RegExp(req.params.name, 'i')
            const posts = await Post.find({
                $text: {
                    $search: req.params.name,
                },
            })
            res.send(posts)
        } catch (error) {
            console.log(error)
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: 'Post deleted' })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'there was a problem trying to remove the post',
            })
        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                req.body,
                { new: true }
            )
            res.send({ message: 'post successfully updated', post })
        } catch (error) {
            console.error(error)
        }
    },

}
module.exports = PostController