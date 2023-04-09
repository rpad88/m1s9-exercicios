const yup = require('yup')

const validation = yup.object().shape({
    username: yup
    .string('Username must be string')
    .required('Username required'),
    password: yup
    .string('Password must be string')
    .min(8, 'Password must be at least 8 characters')
    .required('Password required')
})

async function validaUser(req, res, next) {
    console.info('validaUser 🕵️‍♂️')
    try {
        await validation.validate(req.body)
        next()
    } catch (error){
        res.status(400).json({message: error.message})
        console.error(error.message)
    }
}
module.exports = validaUser