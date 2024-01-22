const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    email: { type: String, unique: true, index: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    leavingDate: { type: Date, default: null },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    designation: { type: String, required: true },
})


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;