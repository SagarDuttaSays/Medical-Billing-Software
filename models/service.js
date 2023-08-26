const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:String,
    price:{type:Number, required:true, min:1}
})

module.exports = mongoose.model('Service', serviceSchema);
