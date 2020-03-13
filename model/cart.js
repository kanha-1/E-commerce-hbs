var mongoose = require('mongoose')

var Schema = mongoose.Schema

var cartchema = new Schema({
    image:{type:String,required:true},
    name:{type: String, required: true},
    price:{type: Number, required: true},
    catagory:{type: String, required: true},
    quantity:{type:Number,required:true}
})
var cart = mongoose.model("Cart",cartchema)
module.exports = cart