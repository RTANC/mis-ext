const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
  },
  operatorsAliases: {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
  }
})

const Task = sequelize.define('task2', {
  tsk_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  obligation_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  task_type_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true }, // ด้าน
  unit_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  bus_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  stg_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  act_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  rst_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  bgp_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
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
  act_sub_budget_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  act_budget_group_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  keyword: { type: Sequelize.CHAR(300), allowNull: true },
  hour: { type: Sequelize.INTEGER, allowNull: true },
  consummate_flag: { type: Sequelize.INTEGER, allowNull: true },
  consummate_note: { type: Sequelize.CHAR(300), allowNull: true },
  tsk_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true },
  tsk_buget_score: { type: Sequelize.INTEGER, allowNull: true },
  tsk_budget_back: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
  tsk_bugget_no: { type: Sequelize.CHAR(50), allowNull: true },
  budget_type: { type: Sequelize.INTEGER, allowNull: true }
})

const budgetDetail = sequelize.define('budget_detail', {
  budget_detail_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  tsk_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  budget_source_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  budget_flag: { type: Sequelize.INTEGER, allowNull: true }, // 1 = ทบ., 2 = รายรับ
  budget_amount: { type: Sequelize.DECIMAL(18, 2), allowNull: true },
  budget_app_amount: { type: Sequelize.DECIMAL(18, 2), allowNull: true },
  budget_detail_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const taskType = sequelize.define('task_type', {
  task_type_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  task_type_name: { type: Sequelize.CHAR(200), allowNull: true },
  task_type_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const Person = sequelize.define('person', {
  person_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  rank_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  corps_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  original_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  province_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  religion_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  height: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  blood_group_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  person_unit_id: { type: Sequelize.DECIMAL(10, 0), allowNull: true },
  race: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  nationality: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  mil_number: { type: Sequelize.CHAR(9), allowNull: true },
  id_number: { type: Sequelize.CHAR(13), allowNull: true },
  person_name: { type: Sequelize.CHAR(200), allowNull: true },
  person_surname: { type: Sequelize.CHAR(200), allowNull: true },
  person_ename: { type: Sequelize.CHAR(200), allowNull: true },
  person_esurname: { type: Sequelize.CHAR(200), allowNull: true },
  person_type: { type: Sequelize.INTEGER, allowNull: true },
  nick_name: { type: Sequelize.CHAR(50), allowNull: true },
  gender: { type: Sequelize.INTEGER, allowNull: true },
  birthday: { type: Sequelize.DATE, allowNull: true },
  marriage_status: { type: Sequelize.INTEGER, allowNull: true },
  service_from: { type: Sequelize.DATE, allowNull: true },
  service_to: { type: Sequelize.DATE, allowNull: true },
  mobile_phone: { type: Sequelize.CHAR(200), allowNull: true },
  internal_phone: { type: Sequelize.CHAR(200), allowNull: true },
  email: { type: Sequelize.CHAR(200), allowNull: true },
  complexion: { type: Sequelize.CHAR(200), allowNull: true },
  appearance: { type: Sequelize.CHAR(200), allowNull: true },
  mark: { type: Sequelize.CHAR(200), allowNull: true },
  teacher_flag: { type: Sequelize.INTEGER, allowNull: true },// 0 = ไม่มี ชม. สอน, 1 มี ชม. สอน
  person_status: { type: Sequelize.INTEGER, allowNull: true }, // 1 = รับราชการ วพบ.
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const personLicense = sequelize.define('person_license', {
  person_license_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  person_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  person_name: { type: Sequelize.CHAR(200), allowNull: true },
  profession_license_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  license_no: { type: Sequelize.CHAR(100), allowNull: true },
  license_date: { type: Sequelize.DATE, allowNull: true },
  expire_date: { type: Sequelize.DATE, allowNull: true },
  person_license_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const Rank = sequelize.define('rank', {
  rank_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  rank_type: { type: Sequelize.INTEGER, allowNull: true },
  rank_name: { type: Sequelize.CHAR(100), allowNull: true },
  rank_abbr: { type: Sequelize.CHAR(50), allowNull: true },
  rank_order: { type: Sequelize.INTEGER, allowNull: true },
  rank_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const personEducation = sequelize.define('person_education', {
  person_education_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  education_level: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  edu_course_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  major_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  institution_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  country_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  person_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  person_name: { type: Sequelize.CHAR(200), allowNull: true },
  education_year: { type: Sequelize.INTEGER, allowNull: true },
  education_date: { type: Sequelize.DATE, allowNull: true },
  note: { type: Sequelize.CHAR(500), allowNull: true },
  person_education_status: { type: Sequelize.INTEGER, allowNull: true },
  education_level_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  nurse_flag: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const educationLevel = sequelize.define('education_level', {
  education_level_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  education_level_name: { type: Sequelize.CHAR(200), allowNull: true },
  education_level_flag: { type: Sequelize.INTEGER, allowNull: true },
  education_level_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const Major = sequelize.define('major', {
  major_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  major_name: { type: Sequelize.CHAR(500), allowNull: true },
  major_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const Institution = sequelize.define('institution', {
  institution_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  country_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  institution_name: { type: Sequelize.CHAR(500), allowNull: true },
  institution_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const personPosition = sequelize.define('person_position', {
  person_position_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  person_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  person_name: { type: Sequelize.CHAR(200), allowNull: true },
  position_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  property: { type: Sequelize.CHAR(100), allowNull: true },
  position_level: { type: Sequelize.CHAR(100), allowNull: true },
  position_date: { type: Sequelize.DATE, allowNull: true },
  doc_ref: { type: Sequelize.CHAR(500), allowNull: true },
  person_position_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const Position = sequelize.define('position', {
  position_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  position_name: { type: Sequelize.CHAR(200), allowNull: true },
  position_abbr: { type: Sequelize.CHAR(50), allowNull: true },
  position_flag: { type: Sequelize.INTEGER, allowNull: true },
  position_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

const teachExp = sequelize.define('teach_experience', {
  teach_experience_id: { type: Sequelize.NUMERIC(18, 0), primaryKey: true, autoIncrement: true },
  person_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  person_name: { type: Sequelize.CHAR(200), allowNull: true },
  institution_id: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  nurse_flag: { type: Sequelize.INTEGER, allowNull: true },
  from_date: { type: Sequelize.DATE, allowNull: true },
  to_date: { type: Sequelize.DATE, allowNull: true },
  note: { type: Sequelize.CHAR(500), allowNull: true },
  teach_experience_status: { type: Sequelize.INTEGER, allowNull: true },
  create_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  create_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: true },
  update_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  update_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  delete_by: { type: Sequelize.NUMERIC(18, 0), allowNull: true },
  delete_by_name: { type: Sequelize.CHAR(200), allowNull: true },
  delete_date: { type: Sequelize.DATE, allowNull: true }
})

Task.hasMany(budgetDetail, { foreignKey: 'tsk_id' })
budgetDetail.belongsTo(Task, { foreignKey: 'tsk_id' })

taskType.hasMany(Task, { foreignKey: 'task_type_id' })
Task.belongsTo(taskType, { foreignKey: 'task_type_id' })

Person.hasMany(personLicense, { foreignKey: 'person_id' })
personLicense.belongsTo(Person, { foreignKey: 'person_id' })

Rank.hasMany(Person, { foreignKey: 'rank_id' })
Person.belongsTo(Rank, { foreignKey: 'rank_id' })

Person.hasMany(personEducation, { foreignKey: 'person_id' })
personEducation.belongsTo(Person, { foreignKey: 'person_id' })

// personEducation.hasMany(educationLevel, { foreignKey: 'education_level_id', sourceKey: 'education_level' })
// educationLevel.belongsTo(personEducation, { foreignKey: 'education_level_id' })

Major.hasOne(personEducation, { foreignKey: 'major_id' })
personEducation.belongsTo(Major, { foreignKey: 'major_id' })

Institution.hasOne(personEducation, { foreignKey: 'institution_id' })
personEducation.belongsTo(Institution, { foreignKey: 'institution_id' })

Person.hasMany(personPosition, { foreignKey: 'person_id' })
personPosition.belongsTo(Person, { foreignKey: 'person_id' })

Position.hasOne(personPosition, { foreignKey: 'position_id' })
personPosition.belongsTo(Position, { foreignKey: 'position_id' })

Person.hasMany(teachExp, { foreignKey: 'person_id' })
teachExp.belongsTo(Person, { foreignKey: 'person_id' })

// Task.hasOne(taskType, { foreignKey: { name: 'task_type_id' }, sourceKey: 'task_type_id' })
// taskType.belongsTo(Task, { foreignKey: { name: 'task_type_id' }, targetKey: 'task_type_id' })

// Subject.hasMany(Topic, { foreignKey: 'subjectId', onDelete: 'cascade'})
// Topic.belongsTo(Subject, { foreignKey: 'subjectId', onDelete: 'cascade'})

// Topic.hasMany(Question, { foreignKey: 'topicId', onDelete: 'cascade' })
// Question.belongsTo(Topic, { foreignKey: 'topicId', onDelete: 'cascade' })


module.exports = { Task, budgetDetail, taskType, Person, personLicense, Rank, personEducation, educationLevel, Major, Institution, personPosition, Position, teachExp }