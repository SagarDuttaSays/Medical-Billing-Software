const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:String,
    price:{type:Number, required:true, min:1}
})

module.exports = mongoose.model('Product', productSchema);
