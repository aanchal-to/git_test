const { createCustomer, updateCustomer, deleteCustomer, findCustomer, fileUpload, customerOrder} = require("../controllers/customerController");
const { createOrder, getOrder }=require('../controllers/orderController');
const express = require('express');
const customer=require('../models/customer');
const order=require('../models/order');
var router = express.Router();

router.post('/create-new-user', createCustomer);
router.put('/update-new-user/:id', updateCustomer);
router.delete('/delete-new-user/:id', deleteCustomer);
router.get('/find-new-user', findCustomer)
router.post('/fileUpload', fileUpload)
router.post('/createorder', createOrder);
router.get('/getOrder', getOrder)
router.get('/customerOrder', customerOrder)


module.exports = router