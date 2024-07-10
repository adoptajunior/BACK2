const mongoose = require('mongoose')

// Actualizamos el modelo Post
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema(
    {
        name: String,
        comments: [{
            userId: { type: ObjectId, ref: 'User' },
            comment: String,
        }],
        // añadiendo like a Post
        likes: [{
            type: ObjectId
        }],
    },
    { timestamps: true }
)

PostSchema.index({
    name: 'text',
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post
