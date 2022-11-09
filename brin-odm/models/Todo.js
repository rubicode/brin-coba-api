const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    executor: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Todo', todoSchema);