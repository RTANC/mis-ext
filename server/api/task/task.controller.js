const Sequelize = require('sequelize')
const { Task } = require('../../models')

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll()
        res.status(200).send(tasks)
    } catch (error) {
        next(error)
    }
}