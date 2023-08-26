const express = require("express");
const router = express.Router();

//MVC Architecture - Controller
const userCartController = require('../controllers/userCart')

//CRUD - C for Create
//insert order details
router.post(`/:id/checkOutCart/placeOrder`, userCartController.placeOrder);

//CRUD R for Read
//Get cart details of user with the given ID
router.get("/:id", userCartController.getOneCart);

//Get 'check-out my cart' details of user with the given ID
router.get("/:id/checkOutCart", userCartController.checkOutCart);

//CRUD U for Update
//Add or remove products and services from the cart of the user with the given ID
router.put("/:id", userCartController.updateOneCart);

//CRUD D for Delete
//delete all the products and services from the cart of the user with the given ID
router.delete("/:id/emptyMyCart", userCartController.emptyOneCart);

module.exports = router;
