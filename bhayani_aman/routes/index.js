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


router.get('/api/order', (req, res)=> {
  Order.find({}, (err, orders)=> {
      if (err) {
        res.status(500).json({status : "Error retrieving orders"});
        return;
      }
      res.json(orders);
  }).limit(10);
});



router.post('/api/lookup', (req, res)=> {
  console.log("getting the search...");
  console.log(req.body);
  let search = req.body.search;

  if(isNaN(search)){
    Order.find({name: new RegExp(search)}, (err, orders)=> {
        if (err) {
          res.status(500).json({status : "Error retrieving orders"});
          return;
        }
      res.json(orders)
      //console.log(orders)
    })
  }else{
    Order.find({phone: new RegExp(search)}, (err, orders)=> {
      if (err) {
        res.status(500).json({status : "Error retrieving orders"});
        return;
      }
    res.json(orders)
    //console.log(orders)
  })

  }


});

module.exports = router;
