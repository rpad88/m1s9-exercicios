const Place = require("../../../src/models/Place")

async function placesList (req, res) {
    const allPlaces = await Place.findAll()
    res.status(200).json(allPlaces)
}

module.exports = placesList