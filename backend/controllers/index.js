const { json, where } = require("sequelize");
const Place = require("../../src/models/Place");

module.exports = {
    index: (req, res) => {
        res.status(200)
    },
    newPlace: async (req, res) => {
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
            console.error(error)
            res.status(500).json({message: "Unable to process your request"})
        }
    },
    placesList: async (req, res) => {
        const allPlaces = await Place.findAll()
        res.status(200).json(allPlaces)
    },
    deletePlace: async (req, res) => {
        if (!req.params.id) return res.status(406).json({message: "Id necessary."})
        const contains = await Place.findOne({
            where: {
                id: req.params.id
        }})
        if(!contains) return res.status(412).json({message: "Id not exists"})
        try {
            await Place.destroy(
                {where:
                    {id: req.params.id},
                    force: true
                }                    
            )
            res.status(200).json({message: "deleted"})
        } catch (error) {
            console.error('Delete place error: ', error)
            res.status(500).json({message: "Unable to process your request"})
        }
    },
    editPlace: async (req, res) => {
        if(!req.body) return res.status(401)
        const newInfos = req.body
        try {
            Place.update({
                name: newInfos.name,
                phone: newInfos.phone,
                opening_hours: newInfos.opening_hours,
                description: newInfos.description,
                latitude: newInfos.latitude,
                longitude: newInfos.longitude
            }, {
                where: {
                    id: req.params.id
                }
            }).then(async () => {
                console.info(`Place id ${req.params.id} updated`)
                const updatedPlace = await Place.findOne({where: {id: req.params.id}})
                res.status(200).json(updatedPlace)
            })
        } catch (error) {
            console.error('Place update error: ', error)
        }
    }
}