const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

module.exports = () => {
    let server = express(), create, start

    create = (config) => {
        let routes = require('../routes')

        server.set('env', config.env)
        server.set('port', config.port)
        server.set('hostname', config.hostname)

        // Middleware to parse the json
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({
            extended: false
        }))

        mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.od9px.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            }
        )
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.error(err))
        

        routes.init(server)
    }

    start = () => {
        let hostname = server.get('hostname');
        let port = server.get('port');
        server.listen(port, () => {
            console.log('Server listening on - http://', hostname, 'on', port)
        })
    }

    return {
        create: create,
        start: start
    }
}