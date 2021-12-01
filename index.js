const server = require('./configs/app')()
const config = require('./configs/config/config')

server.create(config)
server.start()