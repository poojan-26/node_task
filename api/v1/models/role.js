const mongoose = require("mongoose");
const { type } = require("os");


const roleSchema = mongoose.Schema({
 roleName: String,
 accessModual: [String],
 createdAt: {type: Date, default: Date.now},
  active: { type: Number, enum: [0, 1], default: 1 },
});

const role = mongoose.model("role", roleSchema);

module.exports = role;
