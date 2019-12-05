const express = require('express');
const router = express.Router();
const PriceCaculator = require('../models/PriceCalculator');
const Order = require('../models/orderSchema');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//API Endpoints
router.post('/api/order', (req, res)=> {
  console.log('Received a body ', req.body);
  
  let PriceCalc = new PriceCaculator(req.body);
  let orderTotal = PriceCalc.CalculateOrder();
  let taxAmount = PriceCalc.CalculateSalesTax(orderTotal)
  let totalCost = orderTotal+taxAmount;

  let obj = req.body;
  obj.orderTotal = orderTotal;
  obj.taxAmount = taxAmount;
  obj.totalCost = totalCost


  console.log("this is the object:");
  console.log(obj);


  let order = new Order(obj);

  order.save((err) => {
    if (err) {
      //handle the error
      res.status(500).json({status : "Error adding the order information"});
      return;
    }

    //Successfully added an order
    res.json({status : "Added an order"});
  });


  // res.json({status : "success", message : "Added a course"});

});

module.exports = router;
