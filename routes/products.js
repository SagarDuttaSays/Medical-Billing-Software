const express = require('express');
const router = express.Router();

//MVC Architecture - Controller
const productsController = require('../controllers/products')

//CRUD - C for Create
//Add one product
router.post(`/addOne`, productsController.addOneProduct)

//Add many products
router.post(`/addMany`, productsController.addManyProducts)

//CRUD - R for Read
//Get a product based on its ID
router.get(`/:id`, productsController.getOneProduct)

//Get all the products
router.get(`/`, productsController.getAllProducts)

//CRUD - U for Update
//Update a product based on its id
router.put('/:id', productsController.updateOneProduct)

//CRUD - D for Delete
//Delete a product based on its ID
router.delete('/:id', productsController.deleteOneProduct)

//Delete all the products
router.delete(`/`, productsController.deleteAllProducts)


module.exports = router;