const express = require('express');
const router = express.Router();

//MVC Architecture - Controller
const serviceController = require('../controllers/services')

//CRUD - C for Create
//Add one Service
router.post(`/addOne`, serviceController.addOneService)

//Add many Service
router.post(`/addMany`, serviceController.addManyServices)

//CRUD - R for Read
//Get a service based on its ID
router.get(`/:id`, serviceController.getOneService)

//Get all the Services
router.get(`/`, serviceController.getAllServices)

//CRUD - U for Update
//Update service based on its id
router.put('/:id', serviceController.updateOneService)

//CRUD - D for Delete
//Delete a service based on its ID
router.delete('/:id', serviceController.deleteOneService)

//Delete all the services
router.delete(`/`, serviceController.deleteAllServices)

module.exports =router;