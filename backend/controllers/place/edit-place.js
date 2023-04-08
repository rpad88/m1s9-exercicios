const Place = require("../../../src/models/Place")

async function editPlace (req, res) {
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

module.exports = editPlace