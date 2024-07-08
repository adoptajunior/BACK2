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
            // Actualizamos ProductController.js de la siguiente forma 
            // para implementar nuestra paginación.
            const { page = 1, limit = 10 } = req.query
            const posts = await Post.find()
                // limit: Limita el número de documentos a devolver
                .limit(limit)
                // skip(): sirve para controlar dónde MongoDB comienza a devolver resultados.
                .skip((page - 1) * limit)
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
    // Para insertar un comentario usamos el método findByIdAndUpdate() 
    // para buscar el post y añadirlo.
    // en el ejemplo de clase son reviews 
    async insertComment(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {
                    $push: { reviews: { comment: req.body.comment, userId: req.user._id } },
                }, { new: true })
            res.send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem with your comment' })
        }
    },
    // populate() nos permite hacer referencia a documentos en otras colecciones.
    // En este caso usando populate() nos trae al usuario o usuarios que hicieron los diferentes comentarios.
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const posts = await Post.find()
                .populate('reviews.userId')
                .limit(limit * 1)
                .skip((page - 1) * limit)
            res.send(posts)
        } catch (error) {
            console.error(error)
        }
    },

}
module.exports = PostController