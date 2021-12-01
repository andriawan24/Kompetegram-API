const express = require('express')
const service = require('../services/faculty')
let router = express.Router()

router.get('/fakultas-prodi', service.getFaculty)

module.exports = router