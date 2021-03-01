"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMortgagePayment = void 0;
const amortize_life_payments_1 = require("./amortize-life-payments");
const mortgage_program_config_1 = require("../mortgage-program-config");
const calculateMortgagePayment = (mortgageInput) => {
    const amortizationTable = amortize_life_payments_1.amortizeLifePayments(mortgageInput);
    const mortgageProgram = mortgageInput.mortgageProgram;
    const initialRateMonths = mortgage_program_config_1.mortgageProgramConfig[mortgageProgram].initialRateMonths;
    const rateProgression = amortizationTable.map(period => period.rate);
    const periodicPaymentProgression = amortizationTable.map(period => period.payment);
    const periodicInterestProgression = amortizationTable.map(period => period.interest);
    const totalInterest = periodicInterestProgression.reduce((acc, curr) => acc + curr);
    const loanAmount = mortgageInput.loanAmount;
    return ({
        initialPeriodicPayment: amortizationTable[0].payment,
        initialAdjustedPeriodicPayment: initialRateMonths ? amortizationTable[initialRateMonths].payment : amortizationTable[0].payment,
        lifeCappedAdjustedPeriodicPayment: initialRateMonths ? Math.max(...periodicPaymentProgression) : amortizationTable[0].payment,
        rateProgression,
        periodicPaymentProgression,
        totalInterest,
        interestToPrincipalRatio: totalInterest / loanAmount,
        amortizationTable: amortizationTable
    });
};
exports.calculateMortgagePayment = calculateMortgagePayment;
//# sourceMappingURL=mortgage-payment.js.map