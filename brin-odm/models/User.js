const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

module.exports = model('User', userSchema);