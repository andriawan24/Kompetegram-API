const apiRoute = require('./api')

const init = (server) => {
    server.get('*', (req, res, next) => {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    })

    server.use('/api', apiRoute)
    server.use((req, res, next) => {
        res.status(404).send({
            'status': 'error',
            'message': 'Page not found'
        })
    })
}

module.exports = {
    init: init
}