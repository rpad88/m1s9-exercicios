const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const User = require("../../../src/models/User")

async function session(req, res) {
    if(!req.body) return res.status(401)
    try {
        const userInDatabase = await User.findOne({
            where: {username: req.body.username}
        })

        if (!userInDatabase) return res.status(404).json(({message: "User doesn't exists"}))

        const passwordIsValid = await bcrypt.compare(
            req.body.password,
            userInDatabase.password
        ) //return TRUE or FALSE

        if(!passwordIsValid) return res.status(404).json({message: "credenciais incorretas"})

        const token = jwt.sign(
            { id: req.body.id },
            process.env.CHAVE_JWT,
            { expiresIn: '1h' }
        )

        res.status(200).json({name: userInDatabase.username, token: token})
    } catch (error) {
        console.error('❌',error)
        res.status(500).json({message: "Unable to process your request"})
    }
}

module.exports = session