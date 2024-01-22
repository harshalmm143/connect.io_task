const Employee = require('../models/Employee')

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate({ email: req.params.email }, req.body, { new: true });
        res.status(200).json(updatedEmployee)
    } catch (err) {
        req.status(400).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.json({ message: 'Employee deleted sucessfully' });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}