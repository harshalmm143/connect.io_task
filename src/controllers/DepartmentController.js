const Department = require('../models/Department')

exports.getAllDepartments = async (req, res) => {
    try {
        const allDepartments = await Department.find();
        res.status(200).json(allDepartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createDepartment = async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body)
        res.status(201).json(newDepartment)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const updateDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(updateDepartment);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}