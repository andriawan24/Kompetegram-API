const express = require('express')
const { emit } = require('process')
const Faculty = require('../models/faculty')

const getFaculty = async (req, res, next) => {
    try {
        // let faculties = await Faculty.find({}, { _id: 0, fakultas: 1, kode: 1, prodi: 1 }).sort({'fakultas': 1})
        let agg = [
            {
                $group: {
                    _id: { 'nama_fakultas': "$fakultas" },
                    list_prodi: {
                        '$push': {
                            kode_prodi: "$kode",
                            nama_prodi: "$prodi"
                        }
                    }
                }
            },
            {
                $project: { _id: 1, list_prodi: 1 }
            },
            {
                $sort: { _id: 1 }
            }
        ]

        let faculties = await Faculty.aggregate(agg)

        let fac = []
        faculties.forEach((val) => {
            fac.push(
                {
                    "nama_fakultas" : val._id.nama_fakultas,
                    "list_prodi": val.list_prodi
                }
            )
        })

        console.log("Result changed", fac)
        console.log("Result", faculties)

        return res.status(200).json({
            'data': {
                "universitas": "Universitas Pendidikan Indonesia",
                "list_fakultas": fac
            }
        })
    } catch (error) {
        return res.status(500).json({
            'error': error
        })
    }
}

module.exports = {
    getFaculty: getFaculty
}