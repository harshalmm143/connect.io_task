const Employee = require('../models/Employee')
const Payout = require('../models/Payout')

exports.getEmployeesWithDepartment = async (req, res) => {
    try {
        const employeesWithDept = await Employee.find()
            .populate('department', 'name')
            .populate('department.deptHead', 'firstName lastName');

        res.json(employeesWithDept);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTotalPayout2023 = async (req, res) => {
    try {
        const totalPayout2023 = await Payout.aggregate([
            {
                $match: {
                    payoutDate: {
                        $gte: new Date("2023-01-01"),
                        $lt: new Date("2024-01-01")

                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: { $subtract: ['$fixedAmount', '$deductions', '$variableAmount'] }
                    }
                }
            }

        ])
        res.json({ totalPayout2023: totalPayout2023.length > 0 ? totalPayout2023[0].total : 0 })
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

exports.getTopEmployeesByMonth = async (req, res) => {
    try {
        const topEmployeesByMonth = await Payout.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$payoutDate' }, year: { $year: '$payoutDate' } },
                    maxVariableAmount: { $max: '$variableAmount' },
                    employee: { $first: '$employee' }
                }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employee',
                    foreignField: '_id',
                    as: 'employeeInfo'
                }
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    year: '$_id.year',
                    employeeName: { $concat: ['$employeeInfo.firstName', ' ', '$employeeInfo.lastName'] },
                    totalVariableAmount: '$maxVariableAmount'
                }
            }
        ])
        res.json(topEmployeesByMonth);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

exports.getEmployeesWithoutPayout = async (req, res) => {
    try {
        const employeesWithoutPayout = await Employee.find({
            _id: { $nin: await Payout.distinct('employee', { payoutDate: { $in: [new Date('2023-05-01'), new Date('2023-06-01')] } }) }
        });

        res.json(employeesWithoutPayout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};