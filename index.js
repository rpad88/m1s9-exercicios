require('dotenv').config()
const express = require('express')
const routes = require('./backend/routes')
const connection = require('./src/database')

const app = express()
app.use(express.json()) //obrigatório

const routesList = [
    '/',
    '/places'
]

connection.authenticate()
connection.sync()
console.log('connection stablished successfully');

app.use(routesList, routes)

app.listen(3333, () => console.log('Aplicação online'))