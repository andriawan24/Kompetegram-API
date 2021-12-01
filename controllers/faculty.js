const express = require('express')
const service = require('../services/faculty')
let router = express.Router()

router.get('/fakultas-prodi', service.getFakultasProdi)
router.get('/fakultas', service.getFakultas)
router.get('/:nama_fakultas/prodi', service.getDetailProdiFakultas)
router.get('/prodi', service.getProdi)
router.get('/:kode_prodi', service.getDetailProdi)

module.exports = router