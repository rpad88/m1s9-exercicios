const Place = require("../../../src/models/Place")

async function deletePlace(req, res) {
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
}

module.exports = deletePlace