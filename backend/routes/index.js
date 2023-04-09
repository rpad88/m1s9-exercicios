const express = require('express')
const router = express.Router()

// CONTROLLERS
const newPlace = require('../controllers/place/new-place')
const placesList = require('../controllers/place/places-list')
const deletePlace = require('../controllers/place/delete-place')
const editPlace = require('../controllers/place/edit-place')
const newUser = require('../controllers/user/new-user')
const session = require('../controllers/user/session')

// MIDDLEWARES
const validaToken = require('../../src/middlewares/valida-token')
const validaUser = require('../../src/middlewares/valida-user')
// const index = require('../controllers')

// GET
// router.get('/', index)
router.get('/places', validaToken, placesList) //list all places
// POST
router.post('/places', validaToken, newPlace) //create a place
router.post('/users', validaToken, newUser) //create a new user
router.post('/sessions', validaUser, session ) //Login
// DELETE
router.delete('/places/:id', validaToken, deletePlace) //delete a place
// PUT
router.put('/places/:id', validaToken, editPlace) //edit a place

module.exports = router