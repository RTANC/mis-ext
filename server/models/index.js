const Sequelize = require('sequelize')

const sequelize = new Sequelize('armynurse_real3', 'sa', 'Intell1', {
  host: '192.168.100.10',
  dialect: 'mssql',
  pool: {
    max: 30,
    min: 10,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

const Task = sequelize.define('task2', {
  tsk_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  obligation_id: { type: Sequelize.INTEGER, allowNull: true },
  task_type_id: { type: Sequelize.INTEGER, allowNull: true },
  unit_id: { type: Sequelize.INTEGER, allowNull: true },
  bus_id: { type: Sequelize.INTEGER, allowNull: true },
  stg_id: { type: Sequelize.INTEGER, allowNull: true },
  act_id: { type: Sequelize.INTEGER, allowNull: true },
  rst_id: { type: Sequelize.INTEGER, allowNull: true },
  bgp_id: { type: Sequelize.INTEGER, allowNull: true },
  tsk_parent: { type: Sequelize.INTEGER, allowNull: true },
  tsk_year: { type: Sequelize.INTEGER, allowNull: true },
  tsk_no: { type: Sequelize.CHAR(20), allowNull: true },
  tsk_priority: { type: Sequelize.INTEGER, allowNull: true },
  tsk_name: { type: Sequelize.CHAR(300), allowNull: true },
  tsk_file: { type: Sequelize.CHAR(200), allowNull: true },
  tsk_note: { type: Sequelize.CHAR(2000), allowNull: true },
  tsk_flag: { type: Sequelize.INTEGER, allowNull: true }, // 1 โครงการ, 2 กิจกรรม
  tsk_budget_no: { type: Sequelize.CHAR(20), allowNull: true },
  tsk_budget_all: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_budget_app: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_budget_transfer: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_budget_bak: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_budget_issue: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_budget_remain: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_expect_start_date: { type: Sequelize.DATE, allowNull: true },
  tsk_expect_end_date: { type: Sequelize.DATE, allowNull: true },
  tsk_start_date: { type: Sequelize.DATE, allowNull: true },
  tsk_end_date: { type: Sequelize.DATE, allowNull: true },
  tsk_work_score: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_budget_score: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_process_status: { type: Sequelize.INTEGER, allowNull: true },
  tsk_progress: { type: Sequelize.INTEGER, allowNull: true },
  act_sub_budget_id: { type: Sequelize.INTEGER, allowNull: true },
  act_budget_group_id: { type: Sequelize.INTEGER, allowNull: true },
  keyword: { type: Sequelize.CHAR(300), allowNull: true },
  hour: { type: Sequelize.INTEGER, allowNull: true },
  consummate_flag: { type: Sequelize.INTEGER, allowNull: true },
  consummate_note: { type: Sequelize.CHAR(300), allowNull: true },
  tsk_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.INTEGER, allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.INTEGER, allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.INTEGER, allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true },
  tsk_buget_score: { type: Sequelize.INTEGER, allowNull: true },
  tsk_budget_back: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_bugget_no: { type: Sequelize.CHAR(50), allowNull: true },
  budget_type: { type: Sequelize.INTEGER, allowNull: true }
})

// const Log = sequelize.define('logs', {
//     logId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
// })

// const Subject =  sequelize.define('subjects', {
//     subjectId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: Sequelize.STRING, allowNull: false },
//     deptId: { type: Sequelize.TINYINT, allowNull: true }
// })

// const Topic = sequelize.define('topics', {
//     topicId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: Sequelize.STRING, allowNull: false }
// })

// const Question = sequelize.define('questions', {
//     questionId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     text: { type: Sequelize.TEXT, allowNull: false },
//     score: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 1 },
//     answer: { type: Sequelize.TINYINT, allowNull: false },
//     choice1: { type: Sequelize.TEXT, allowNull: false },
//     choice2: { type: Sequelize.TEXT, allowNull: false },
//     choice3: { type: Sequelize.TEXT, allowNull: false },
//     choice4: { type: Sequelize.TEXT, allowNull: false },
//     choice5: { type: Sequelize.TEXT, allowNull: true }
// })

// User.hasMany(Log, { foreignKey: 'userId' })
// Log.belongsTo(User, { foreignKey: 'userId' })

// Subject.hasMany(Topic, { foreignKey: 'subjectId', onDelete: 'cascade'})
// Topic.belongsTo(Subject, { foreignKey: 'subjectId', onDelete: 'cascade'})

// Topic.hasMany(Question, { foreignKey: 'topicId', onDelete: 'cascade' })
// Question.belongsTo(Topic, { foreignKey: 'topicId', onDelete: 'cascade' })


module.exports = { Task }