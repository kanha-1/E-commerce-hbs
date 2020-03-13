var mongoose = require('mongoose')

var Schema = mongoose.Schema

var productschema = new Schema({
    image:{type:String,required:true},
    name:{type: String, required: true},
    price:{type: Number, required: true},
    catagory:{type: String, required: true}
})
var Products = mongoose.model("products",productschema)
module.exports = Products