const jwt = require('jsonwebtoken')

function validaToken(req, res, next) {
    console.info("validaToken 🆔")

    const token = req.headers.authorization
    if(!token || !token.startsWith('Bearer ')) return res.status(403).json({message: 'token ausente'})

    const tokenJwt = token.slice(7)

    jwt.verify(tokenJwt, process.env.CHAVE_JWT, (error, conteudoDoToken) => {
        if(error) {
            if(error.name === "TokenExpiredError") return res.status(403).json({message: 'Token expirado'})
            if(error.name === "JsonWebTokenError") return res.status(403).json({message: 'Token invalido'})
            return res.status(500)
        }
        req.body.user_id = conteudoDoToken.id
        next()
    })
}

module.exports = validaToken