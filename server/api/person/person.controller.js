const sequelize = require('sequelize')
const moment = require('moment')
const { Person, Rank, personLicense, personEducation, Major, Institution, personPosition, Position } = require('../../models')

exports.getTeacher = async (req, res, next) => {
    try {
        const teachers = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender'],
            where: {
                person_status: 1,
                person_type: 2,
                person_unit_id: {
                    $ne: 24
                }
            },
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }, {
                model: personLicense,
                attributes: ['license_no', 'license_date', 'expire_date']
            }, {
                model: personEducation,
                attributes: ['person_education_id', 'education_level', 'major_id', 'institution_id', 'nurse_flag'],
                where: {
                    person_education_status: 1
                },
                include: [{
                    model: Major,
                    attributes: ['major_name']
                }, {
                    model: Institution,
                    attributes: ['institution_name']
                }]
            }, {
                model: personPosition,
                attributes: ['position_date'],
                include: [{
                    model: Position,
                    attributes: ['position_name']
                }]
            }],
            order: [[personLicense, 'license_date', 'DESC'], [personPosition, 'position_date', 'DESC']]
        })
        res.status(200).send(teachers)
    } catch (error) {
        next(error)
    }
}

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
                const pl = val.person_licenses[0]
                pl.expire_date = moment(pl.license_date).add(5, 'y').subtract(1, 'd')
                let dd = moment(pl.expire_date).diff(moment(), 'months')
                if (dd < 0) {
                    const mul = (Math.floor(dd / 60) * 5) * -1
                    pl.license_date = moment(pl.license_date).add(mul, 'y')
                    pl.expire_date = moment(pl.license_date).add(5, 'y').subtract(1, 'd')
                    dd = moment(pl.expire_date).diff(moment(), 'months')
                }
                const teacher = {
                    fullname: (val.gender === 2) ? val.rank.rank_abbr + 'หญิง ' + val.person_name + ' ' + val.person_surname : val.rank.rank_abbr + ' ' + val.person_name + ' ' + val.person_surname,
                    license_no: pl.license_no,
                    license_date: moment(pl.license_date).add(543, 'y').format('DD MMMM YYYY'),
                    expire_date: moment(pl.expire_date).add(543, 'y').format('DD MMMM YYYY'),
                    dd: dd
                }
                if (dd >= 0 && dd <= 3) {
                    expires.three.push(teacher)
                } else if (dd > 3 && dd <= 6) {
                    expires.six.push(teacher)
                } else if (dd > 6 && dd <= 9) {
                    expires.nine.push(teacher)
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
            tenYears: [0, 0],
            yearList: {
                teachers: [],
                supports: []
            },
            fiveYearList: {
                teachers: [],
                supports: []
            },
            tenYearList: {
                teachers: [],
                supports: []
            }
        }
        let startDate = moment((parseInt(req.query.year) - 604) + '-10-01').format()
        let endDate = moment((parseInt(req.query.year) - 603) + '-09-30').format()
        result.yearList.teachers = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender', 'person_id'],
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }],
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
        result.yearList.supports = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender', 'person_id'],
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }],
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
        startDate = moment((parseInt(req.query.year) - 603) + '-10-01').format()
        endDate = moment((parseInt(req.query.year) - 599) + '-09-30').format()
        result.fiveYearList.teachers = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender', 'person_id'],
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }],
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
        result.fiveYearList.supports = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender', 'person_id'],
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }],
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
        startDate = moment((parseInt(req.query.year) - 599) + '-10-01').format()
        endDate = moment((parseInt(req.query.year) - 594) + '-09-30').format()
        result.tenYearList.teachers = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender', 'person_id'],
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }],
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
        result.tenYearList.supports = await Person.findAll({
            attributes: ['person_name', 'person_surname', 'gender', 'person_id'],
            include: [{
                model: Rank,
                attributes: ['rank_abbr']
            }],
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
        result.year[0] = result.yearList.teachers.length
        result.year[1] = result.yearList.supports.length
        result.fiveYears[0] = result.fiveYearList.teachers.length
        result.fiveYears[1] = result.fiveYearList.supports.length
        result.tenYears[0] = result.tenYearList.teachers.length
        result.tenYears[1] = result.tenYearList.supports.length
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}