const sequelize = require('sequelize')
const moment = require('moment')
const { Person } = require('../../models')
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

        endDate = moment((parseInt(req.query.year) - 598) + '-09-30').format()
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

        endDate = moment((parseInt(req.query.year) - 593) + '-09-30').format()
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