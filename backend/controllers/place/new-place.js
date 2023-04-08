const Place = require('../../../src/models/Place')

async function newPlace (req, res) {
    if(!req.body) return res.status(401)
    try {
        const place = {
            name: req.body.name,
            phone: req.body.phone,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }

        // Verificação se já existe o lugar
        const contains = await Place.findOne({
            where: {
                name: place.name
        }})

        if(!contains) {
            const newPlace = await Place.create(place)
            res.status(201).json(newPlace)
        } else {
            res.status(400).json({error: `${place.name} already exists.`})
        }
    } catch (error) {
        console.error('❌', error)
        res.status(500).json({message: "Unable to process your request"})
    }
}

module.exports = newPlace