const Place = require("../../src/models/Place");

module.exports = {
    index: (req, res) => {
        res.status(200).json({msg: 'ok'})
    },
    places: async (req, res) => {
        try {
            if(!req.body.name) return res.status(401)

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
                res.status(400).json({error: `${place.name} already exists`})
            }
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: "não conseguimos processar a sua requisição"})
        }
    },
    placesList: (req, res) => {
        res.status(200).json({msg: 'ok'})
    }
}