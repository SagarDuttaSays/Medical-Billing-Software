const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip :{
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    productCart: {
        type:Map,
        of:Number,
        default: {}
    },
    serviceCart: {
        type:Map,
        of:Number,
        default: {}
    },
    orderIDs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});
module.exports = mongoose.model('User', userSchema);

