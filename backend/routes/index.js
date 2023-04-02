const express = require('express')
const router = express.Router()

const controller = require('../controllers')

// GET
router.get('/', controller.index)
router.get('/places', controller.placesList)
// POST
router.post('/places', controller.places)

module.exports = router