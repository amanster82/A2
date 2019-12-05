var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    size: String,
    crust: String,
    meats: [],
    veggies: [],
    tax: Number,
    phone: Number,
    house: Number,
    street: String,
    city: String,
    postal: String,
    orderTotal: Number,
    taxAmount: Number,
    totalCost: Number
});


module.exports = mongoose.model('order', orderSchema);