"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amortizePeriodicPayments = void 0;
const calculate_periodic_payment_1 = require("./calculate-periodic-payment");
const amortizePeriodicPayments = (amortizationContext) => {
    const { startingPeriod, periodBeginningBalance, interestRate, loanLifeInMonths, periodsCount, paymentFreqPerYear, interestOnly } = amortizationContext;
    const periodicPayment = calculate_periodic_payment_1.calculatePeriodicPayments({
        loanAmount: periodBeginningBalance,
        interestRate,
        loanLifeInMonths,
        paymentFreqPerYear,
        interestOnly
    });
    const beginningAmortizedPeriodicFlow = {
        period: startingPeriod,
        payment: periodicPayment,
        rate: interestRate,
        interest: interestRate / paymentFreqPerYear * periodBeginningBalance,
        principal: periodicPayment - (interestRate / paymentFreqPerYear * periodBeginningBalance),
        periodEndingBalance: periodBeginningBalance - (periodicPayment - (interestRate / paymentFreqPerYear * periodBeginningBalance))
    };
    const amortizationTable = [beginningAmortizedPeriodicFlow];
    for (let i = 1; i < periodsCount; i++) {
        const beginningAmortizedFlow = amortizationTable[amortizationTable.length - 1];
        const period = beginningAmortizedFlow.period + 1;
        const beginningBalance = beginningAmortizedFlow.periodEndingBalance;
        const currentInterest = interestRate / paymentFreqPerYear * beginningBalance;
        const currentPrincipal = periodicPayment - currentInterest;
        const endingBalance = beginningBalance - currentPrincipal;
        amortizationTable.push({
            period: period,
            payment: periodicPayment,
            rate: interestRate,
            interest: currentInterest,
            principal: currentPrincipal,
            periodEndingBalance: endingBalance,
        });
    }
    return amortizationTable;
};
exports.amortizePeriodicPayments = amortizePeriodicPayments;
//# sourceMappingURL=amortize-periodic-payments.js.map