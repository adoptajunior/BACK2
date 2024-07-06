const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        name: String
    },
    { timestamps: true }
)

PostSchema.index({
    name: 'text',
})


const Post = mongoose.model('Post', PostSchema)
module.exports = Post
