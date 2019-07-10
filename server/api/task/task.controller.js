const sequelize = require('sequelize')
const { Task } = require('../../models')

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            where: {
                tsk_year: req.query.year,
                tsk_flag: 1
            }
        })
        res.status(200).send(tasks)
    } catch (error) {
        next(error)
    }
}

exports.getTaskHistory = async (req, res, next) => {
    try {
        const history = await Task.findAll({
            attributes: ['tsk_year', [sequelize.fn('count', sequelize.col('tsk_id')), 'count']],
            group: ['tsk_year'],
            where: {
                tsk_flag: 1
            }
        })
        res.status(200).send(history)
    } catch (error) {
        next(error)
    }
}

exports.getActivities = async (req, res, next) => {
    try {
        const activities = await Task.findAll({
            where: {
                tsk_parent: req.params.tskId,
                tsk_flag: 2
            }
        })
        res.status(200).send(activities)
    } catch (error) {
        next(error)
    }
}