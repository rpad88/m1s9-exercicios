const express = require('express')
const router = express.Router()

const controller = require('../controllers')

// GET
router.get('/', controller.index)
router.get('/places', controller.placesList)
// POST
router.post('/places', controller.newPlace)
// DELETE
router.delete('/places/:id', controller.deletePlace)
// PUT
router.put('/places/:id', controller.editPlace)

module.exports = router