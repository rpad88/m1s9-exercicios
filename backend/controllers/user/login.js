const User = require("../../../src/models/User")

async function login(req, res) {
    if(!req.body) return res.status(401)
    try {
        
        const userInDatabase = await User.findOne({
            where: {username: req.body.username}
        })

        if (!userInDatabase) return res.status(404).json(({message: "User doesn't exists"}))
    } catch (error) {
        console.error('❌',error)
        res.status(500).json({message: "Unable to process your request"})
    }
}