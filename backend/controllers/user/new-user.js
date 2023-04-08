const User = require("../../../src/models/User")

async function newUser (req, res) {
    if(!req.body) return res.status(401)
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        const hasEmailOnDatabase = await User.findOne({where: {email: user.email}})
        
        if(!hasEmailOnDatabase) {
            const newUser = await User.create(user)
            const {password, ...rest} = newUser
            console.log(password, rest)
            return res.status(201).json(rest)
        }
        res.status(400).json({message: `${user.email} already exists`})
    } catch (error) {
        console.error('❌',error.message)
        res.status(500).json({message: "Unable to process your request"})
    }
}

module.exports = newUser