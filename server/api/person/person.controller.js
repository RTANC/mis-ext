const sequelize = require('sequelize')
const moment = require('moment')
const { Person, Rank, personLicense } = require('../../models')

exports.getLicenseExpire = async (req, res, next) => {
    try {
        const expires = {
            expired: [],
            three: [],
            six: [],
            nine: []
        }
        const persons = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender'],
            where: {
                original_id: 1, //กำเนิดจาก นรพ.
                person_status: 1
            },
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }, {
                model: personLicense,
                attributes: ['license_no', 'license_date', 'expire_date']
            }],
            order: [[personLicense, 'license_date', 'DESC']]
        })
        persons.forEach(val => {
            if (val.person_licenses.length !== 0) {
                val.person_licenses[0].expire_date = moment(val.person_licenses[0].license_date).add(5, 'y').subtract(1, 'd')
                const pl = val.person_licenses[0]
                const dd = moment(pl.expire_date).diff(moment(), 'months')
                if (dd < 0) {
                    expires.expired.push({
                        fullname: (val.gender === 2) ? val.rank.rank_abbr + 'หญิง ' + val.person_name + ' ' + val.person_surname : val.rank.rank_abbr + ' ' + val.person_name + ' ' + val.person_surname,
                        license_no: pl.license_no,
                        license_date: pl.license_date,
                        expire_date: pl.expire_date
                    })
                } else if (dd >= 0 && dd <= 3) {
                    expires.three.push({
                        fullname: (val.gender === 2) ? val.rank.rank_abbr + 'หญิง ' + val.person_name + ' ' + val.person_surname : val.rank.rank_abbr + ' ' + val.person_name + ' ' + val.person_surname,
                        license_no: pl.license_no,
                        license_date: pl.license_date,
                        expire_date: pl.expire_date
                    })
                } else if (dd > 3 && dd <= 6) {
                    expires.six.push({
                        fullname: (val.gender === 2) ? val.rank.rank_abbr + 'หญิง ' + val.person_name + ' ' + val.person_surname : val.rank.rank_abbr + ' ' + val.person_name + ' ' + val.person_surname,
                        license_no: pl.license_no,
                        license_date: pl.license_date,
                        expire_date: pl.expire_date
                    })
                } else if (dd > 6 && dd <= 9) {
                    expires.nine.push({
                        fullname: (val.gender === 2) ? val.rank.rank_abbr + 'หญิง ' + val.person_name + ' ' + val.person_surname : val.rank.rank_abbr + ' ' + val.person_name + ' ' + val.person_surname,
                        license_no: pl.license_no,
                        license_date: pl.license_date,
                        expire_date: pl.expire_date
                    })
                }
            }
        })
        res.status(200).send(expires)
    } catch (error) {
        next(error)
    }
}

exports.getRetire = async (req, res, next) => {
    try {
        let result = {
            year: [0, 0],
            fiveYears: [0, 0],
            tenYears: [0, 0]
        }
        let startDate = moment((parseInt(req.query.year) - 604) + '-10-01').format()
        let endDate = moment((parseInt(req.query.year) - 603) + '-09-30').format()
        result.year[0] = await Person.count({
            where: {
                birthday: {
                    $between: [startDate, endDate]
                },
                $and: [{
                    $or: [{
                        person_status: 1
                    }, {
                        person_status: 6
                    }]
                }, {
                    $or: [{
                        person_type: 1
                    }, {
                        person_type: 2
                    }]
                }]
            }
        })
        result.year[1] = await Person.count({
            where: {
                birthday: {
                    $between: [startDate, endDate]
                },
                $and: [{
                    $or: [{
                        person_status: 1
                    }, {
                        person_status: 6
                    }]
                }, {
                    person_type: 3
                }]
            }
        })

        endDate = moment((parseInt(req.query.year) - 599) + '-09-30').format()
        result.fiveYears[0] = await Person.count({
            where: {
                birthday: {
                    $between: [startDate, endDate]
                },
                $and: [{
                    $or: [{
                        person_status: 1
                    }, {
                        person_status: 6
                    }]
                }, {
                    $or: [{
                        person_type: 1
                    }, {
                        person_type: 2
                    }]
                }]
            }
        })
        result.fiveYears[1] = await Person.count({
            where: {
                birthday: {
                    $between: [startDate, endDate]
                },
                $and: [{
                    $or: [{
                        person_status: 1
                    }, {
                        person_status: 6
                    }]
                }, {
                    person_type: 3
                }]
            }
        })

        endDate = moment((parseInt(req.query.year) - 594) + '-09-30').format()
        result.tenYears[0] = await Person.count({
            where: {
                birthday: {
                    $between: [startDate, endDate]
                },
                $and: [{
                    $or: [{
                        person_status: 1
                    }, {
                        person_status: 6
                    }]
                }, {
                    $or: [{
                        person_type: 1
                    }, {
                        person_type: 2
                    }]
                }]
            }
        })
        result.tenYears[1] = await Person.count({
            where: {
                birthday: {
                    $between: [startDate, endDate]
                },
                $and: [{
                    $or: [{
                        person_status: 1
                    }, {
                        person_status: 6
                    }]
                }, {
                    person_type: 3
                }]
            }
        })
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}