const express = require('express');
const router = express.Router();

//MVC Architecture - Controller
const usersController = require('../controllers/users')

//CRUD - C for Create
//When admin creates a user account
router.post('/', usersController.createOneUser)

//When user creates account by themselves
router.post('/register', usersController.register)

//user login
router.post('/login', usersController.login)

//CRUD - R for Read
//get one user whose ID is provided
router.get(`/:id`, usersController.getOneUser)

//get all the users
router.get(`/`, usersController.getAllUsers)

//CRUD - U for Update
//Admin update a user based on the id
router.put('/:id', usersController.updateOneUser)

//CRUD - D for Delete
//Delete a user based on the ID
router.delete('/:id', usersController.deleteOneUser)

module.exports = router;