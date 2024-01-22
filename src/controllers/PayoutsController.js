const fs = require('fs');
const csvParser = require('csv-parser')
const Payout = require('../models/Payout')
const Employee = require('../models/Employee')

exports.uploadPayouts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No CSV file provided' });
        }

        const csvFilePath = req.file.path;
        const csvData = [];

        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                const insertedPayouts = await Promise.all(csvData.map(async (row) => {
                    const employee = await Employee.findOne({ email: row.employeeEmail });

                    if (!employee) {
                        throw new Error(`Employee with email ${row.employeeEmail} not found.`);
                    }

                    const newPayout = new Payout({
                        payoutDate: new Date(row.payoutDate),
                        fixedAmount: parseFloat(row.fixedAmount),
                        variableAmount: parseFloat(row.variableAmount),
                        deductions: parseFloat(row.deductions),
                        employee: employee._id,
                    });

                    return newPayout.save();
                }));

                fs.unlinkSync(csvFilePath);

                res.json({ message: 'Payouts uploaded successfully', insertedPayouts });
            })
            .on('error', (error) => {
                res.status(400).json({ error: error.message });
            });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};