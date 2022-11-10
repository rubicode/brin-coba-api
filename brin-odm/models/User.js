const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    name: String,
    password: String,
    token: String,
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        const hash = bcrypt.hashSync(user.password, saltRounds);
        user.password = hash
        next()
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', userSchema);