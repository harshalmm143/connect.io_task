const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: { type: String, unique: true, index: true, required: true },
    duties: { type: String, text: true },
    startData: { type: Date, required: true },
    deptHead: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null, validate: { validator: v => v === null || mongoose.Types.ObjectId.isValid(v), message: 'Invalid ObjectId for deptHead' }}

})

const Department = mongoose.model('Department', departmentSchema)
module.exports = Department;