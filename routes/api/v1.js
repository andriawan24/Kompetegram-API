const facultyController = require('../../controllers/faculty')

const express = require('express')
let router = express.Router()
router.use('/', facultyController)

module.exports = router