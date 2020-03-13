var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Usercschema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
var User = mongoose.model("usercschema", Usercschema);
module.exports = User;
