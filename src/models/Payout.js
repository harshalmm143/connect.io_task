const mongoose = require("mongoose")

const payoutSchema = new mongoose.Schema({
    payoutDate: { type: Date, required: true },
    fixedAmount: { type: Number, required: true },
    variableAmount: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
})
const Payout = mongoose.model('Payout', payoutSchema);
module.exports = Payout;