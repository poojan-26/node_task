const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
      },
      roleId: {
        type: Schema.Types.ObjectId,
        ref: "role",
        index: true,
      },
    creationdate: {type: Date, default: Date.now},
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);