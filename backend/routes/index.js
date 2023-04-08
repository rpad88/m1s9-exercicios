const express = require('express')
const router = express.Router()

// CONTROLLERS
const newPlace = require('../controllers/place/new-place')
const placesList = require('../controllers/place/places-list')
const deletePlace = require('../controllers/place/delete-place')
const editPlace = require('../controllers/place/edit-place')
const newUser = require('../controllers/user/new-user')

// GET
// router.get('/', controller.index)
router.get('/places', placesList)
// POST
router.post('/places', newPlace)
router.post('/users', newUser)
router.post('/sessions' )
// DELETE
router.delete('/places/:id', deletePlace)
// PUT
router.put('/places/:id', editPlace)

module.exports = router