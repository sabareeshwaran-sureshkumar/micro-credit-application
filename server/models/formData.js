import mongoose from "mongoose";

const FormDataSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobileNumber: String,
    address: String,
    panNumber: String,
    company: String,
    currentSalary: Number,
    previousSalary: Number,
    ownsHouse: String,
    rentAmount: Number,
    groceryExpense: Number,
    currentEMIs: Number,
    prevHikeDate: Date,
    nextHikeDate: Date,
    bankName: String,
    mallVisits: Number,
    mallSpending: Number,
    creditCardDebt: Number,
    loanAmount: Number,
    repaymentPeriod: Number,
    existingLoans: Number,
    annualIncome: Number,
    loanPurpose: String,
    creditScore: Number,
    employerContact: String
}, { timestamps: true });

const FormData = mongoose.model('FormData', FormDataSchema);
export default FormData


