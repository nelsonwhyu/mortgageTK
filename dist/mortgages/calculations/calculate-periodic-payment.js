"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePeriodicPayments = void 0;
const calculatePeriodicPayments = (monthlyPaymentContext) => {
    const { loanAmount, interestRate, paymentFreqPerYear, loanLifeInMonths, interestOnly } = monthlyPaymentContext;
    const periodicRate = interestRate / paymentFreqPerYear;
    return (interestOnly
        ? loanAmount * periodicRate
        : loanAmount
            * (periodicRate * (Math.pow((1 + periodicRate), (loanLifeInMonths * paymentFreqPerYear / 12))))
            / ((Math.pow((1 + periodicRate), (loanLifeInMonths * paymentFreqPerYear / 12))) - 1));
};
exports.calculatePeriodicPayments = calculatePeriodicPayments;
//# sourceMappingURL=calculate-periodic-payment.js.map